package services

import (
	"errors"

	"github.com/avalent1/snapshop/models"
	"gorm.io/gorm"
)

type CartRepository struct {
	db *gorm.DB
}

func NewCartRepository(db *gorm.DB) *CartRepository {
	return &CartRepository{db}
}

func (r *CartRepository) FindCartItem(userID, productID uint, size string) (*models.Cart, error) {
	var item models.Cart
	err := r.db.Where("user_id = ? AND product_id = ? AND size = ?", userID, productID, size).First(&item).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	return &item, err
}

func (r *CartRepository) IncrementCartItemQuantity(userID, productID uint, size string) error {
	return r.db.Model(&models.Cart{}).
		Where("user_id = ? AND product_id = ? AND size = ?", userID, productID, size).
		Update("quantity", gorm.Expr("quantity + ?", 1)).Error
}

func (r *CartRepository) InsertCartItem(userID, productID int, size string) error {
	cart := models.Cart{
		UserID:    userID,
		ProductID: productID,
		Size:      size,
		Quantity:  1,
	}
	return r.db.Create(&cart).Error
}

func (r *CartRepository) UpdateCartItemQuantity(userID, productID uint, size string, quantity int) error {
	return r.db.Model(&models.Cart{}).
		Where("user_id = ? AND product_id = ? AND size = ?", userID, productID, size).
		Update("quantity", quantity).Error
}

func (r *CartRepository) GetCartItemsByUser(userID uint) ([]models.CartWithPrice, error) {
	var results []models.CartWithPrice
	err := r.db.Raw(`
		SELECT ci.id, ci.user_id, ci.product_id, ci.size, ci.quantity, p.price
		FROM cart_items ci
		JOIN products p ON ci.product_id = p.id
		WHERE ci.user_id = ?
	`, userID).Scan(&results).Error
	return results, err
}

func (r *CartRepository) DeleteCartItem(userID, productID uint, size string) error {
	return r.db.Where("user_id = ? AND product_id = ? AND size = ?", userID, productID, size).
		Delete(&models.Cart{}).Error
}
