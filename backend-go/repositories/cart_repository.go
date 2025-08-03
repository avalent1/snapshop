package repositories

import (
	"sync"

	"github.com/avalent1/snapshop/config"
	"github.com/avalent1/snapshop/models"
	"gorm.io/gorm"
)

type CartRepository struct {
	DB *gorm.DB
}

type Image struct {
	URL string `json:"url"`
}

type DetailedCartItem struct {
	ID        int     `json:"_id"`
	ProductID int     `json:"productId"`
	Name      string  `json:"name"`
	Images    []Image `json:"images"`
	Price     float64 `json:"price"`
	Size      string  `json:"size"`
	Quantity  int     `json:"quantity"`
}

// Konstruktor
func (r *CartRepository) NewCartRepository(db *gorm.DB) *CartRepository {
	return &CartRepository{DB: db}
}

func FindCartItem(userID int, productID int, size string) (*models.Cart, error) {
	var cart models.Cart
	result := config.DB.Raw(`
		SELECT * FROM cart_items 
		WHERE user_id = ? AND product_id = ? AND size = ?
		LIMIT 1
	`, userID, productID, size).Scan(&cart)

	if result.Error != nil {
		return nil, result.Error
	}

	// Ako ne postoji takav redak
	if result.RowsAffected == 0 {
		return nil, nil
	}

	return &cart, nil
}

func IncrementCartItemQuantity(userID int, productID int, size string) error {
	result := config.DB.Exec(`
		UPDATE cart_items 
		SET quantity = quantity + 1 
		WHERE user_id = ? AND product_id = ? AND size = ?
	`, userID, productID, size)

	return result.Error
}

func InsertCartItem(userID int, productID int, size string) error {
	result := config.DB.Exec(`
		INSERT INTO cart_items (user_id, product_id, size, quantity)
		VALUES (?, ?, ?, 1)
	`, userID, productID, size)

	return result.Error
}

func UpdateCartItemQuantity(userID int, productID int, size string, quantity int) error {
	result := config.DB.Exec(`
		UPDATE cart_items 
		SET quantity = ? 
		WHERE user_id = ? AND product_id = ? AND size = ?
	`, quantity, userID, productID, size)

	return result.Error
}

func GetCartItemsByUser(db *gorm.DB, userID int) ([]models.Cart, error) {
	var items []models.Cart

	result := db.Raw(`
		SELECT ci.id, ci.user_id, ci.product_id, ci.size, ci.quantity, p.price
		FROM cart_items ci
		JOIN products p ON ci.product_id = p.id
		WHERE ci.user_id = ?
	`, userID).Scan(&items)

	return items, result.Error
}

func DeleteCartItem(userID int, productID int, size string) error {
	result := config.DB.Exec(`
		DELETE FROM cart_items
		WHERE user_id = ? AND product_id = ? AND size = ?
	`, userID, productID, size)

	return result.Error
}

func GetDetailedCartItems(userID int) ([]DetailedCartItem, error) {
	cartItems, err := GetCartItemsByUser(config.DB, userID)
	if err != nil {
		return nil, err
	}
	if len(cartItems) == 0 {
		return []DetailedCartItem{}, nil
	}

	detailedItems := make([]DetailedCartItem, len(cartItems))
	var wg sync.WaitGroup
	var mu sync.Mutex
	errs := make(chan error, len(cartItems))

	for i, item := range cartItems {
		wg.Add(1)
		go func(i int, item models.Cart) {
			defer wg.Done()

			var product models.Product
			if err := config.DB.First(&product, item.ProductID).Error; err != nil {
				errs <- err
				return
			}

			var productImages []models.ProductImage
			err := config.DB.Where("product_id = ?", item.ProductID).Find(&productImages).Error
			if err != nil {
				productImages = []models.ProductImage{}
			}
			images := make([]Image, len(productImages))
			for idx, img := range productImages {
				images[idx] = Image{URL: img.URL}

			}

			detail := DetailedCartItem{
				ID:        item.ID,
				ProductID: item.ProductID,
				Name:      product.Name,
				Images:    images,
				Price:     float64(product.Price),
				Size:      item.Size,
				Quantity:  item.Quantity,
			}

			mu.Lock()
			detailedItems[i] = detail
			mu.Unlock()
		}(i, item)
	}

	wg.Wait()
	close(errs)

	for err := range errs {
		return nil, err
	}

	return detailedItems, nil
}
