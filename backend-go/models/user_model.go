package models

// ------------
//  MODELI
// ------------

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Name     string `gorm:"size:100;not null"`
	Email    string `gorm:"size:255;uniqueIndex;not null"`
	Password string `gorm:"size:255;not null"`

	CartData []Cart `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;" json:"cart_data,omitempty"`
}
