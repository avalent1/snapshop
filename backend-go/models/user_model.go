package models

// ------------
//  MODELI
// ------------

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name     string `gorm:"size:100;not null" json:"name"`
	Email    string `gorm:"size:255;uniqueIndex;not null" json:"email"`
	Password string `gorm:"size:255;not null" json:"password"`

	CartData []Cart `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;" json:"cart_data,omitempty"`
}
