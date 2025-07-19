package models

import (
	"time"
)

// ProductImage maps to the `product_images` table and belongs‑to Product.
type ProductImage struct {
	ID        uint     `gorm:"primaryKey;autoIncrement" json:"id"`
	URL       string   `gorm:"type:varchar(500);not null" json:"url"`
	PublicID  string   `gorm:"type:varchar(255);not null" json:"publicId"`
	ProductID uint     `gorm:"column:productId;type:int;not null;index" json:"productId"`
	Product   *Product `gorm:"constraint:OnDelete:CASCADE"` // belongs‑to
	CreatedAt time.Time
	UpdatedAt time.Time
}
