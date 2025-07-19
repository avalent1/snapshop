package models

type Cart struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	UserID    uint   `gorm:"not null" json:"user_id"`
	ProductID uint   `gorm:"not null" json:"product_id"`
	Size      string `gorm:"size:10;not null" json:"size"`
	Quantity  int    `gorm:"not null" json:"quantity"`

	User    User    `gorm:"foreignKey:UserID" json:"-"`
	Product Product `gorm:"foreignKey:ProductID" json:"product,omitempty"`
}

type CartWithPrice struct {
	ID        uint
	UserID    uint
	ProductID uint
	Size      string
	Quantity  int
	Price     float64
}
