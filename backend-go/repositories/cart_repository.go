package repositories

import (
	"github.com/avalent1/snapshop/config"
	"github.com/avalent1/snapshop/models"
	"gorm.io/gorm"
)

type CartRepository struct {
	DB *gorm.DB
}

// Konstruktor
func (r *CartRepository) NewCartRepository(db *gorm.DB) *CartRepository {
	return &CartRepository{DB: db}
}

func FindCartItem(userID uint, productID uint, size string) (*models.Cart, error) {
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

func IncrementCartItemQuantity(userID uint, productID uint, size string) error {
	result := config.DB.Exec(`
		UPDATE cart_items 
		SET quantity = quantity + 1 
		WHERE user_id = ? AND product_id = ? AND size = ?
	`, userID, productID, size)

	return result.Error
}

func InsertCartItem(userID uint, productID uint, size string) error {
	result := config.DB.Exec(`
		INSERT INTO cart_items (user_id, product_id, size, quantity)
		VALUES (?, ?, ?, 1)
	`, userID, productID, size)

	return result.Error
}

func UpdateCartItemQuantity(userID uint, productID uint, size string, quantity int) error {
	result := config.DB.Exec(`
		UPDATE cart_items 
		SET quantity = ? 
		WHERE user_id = ? AND product_id = ? AND size = ?
	`, quantity, userID, productID, size)

	return result.Error
}

func GetCartItemsByUser(userID uint) ([]models.Cart, error) {
	var items []models.Cart
	result := config.DB.Raw(`
		SELECT * FROM cart_items WHERE user_id = ?
	`, userID).Scan(&items)

	return items, result.Error
}
