package models

type Cart struct {
	ID        int     `gorm:"primaryKey;column:id" json:"id"`
	UserID    int     `gorm:"not null;column:user_id" json:"userId"`
	ProductID int     `gorm:"not null;column:product_id" json:"productId"`
	Size      string  `gorm:"size:10;not null;column:size" json:"size"`
	Quantity  int     `gorm:"not null;column:quantity" json:"quantity"`
	Price     float32 `gorm:"not null;column:price" json:"price"`
}

func (Cart) TableName() string {
	return "cart_items"
}

type CartWithPrice struct {
	ID        int
	UserID    int
	ProductID int
	Size      string
	Quantity  int
	Price     float64
}
