package models

// ProductSize predstavlja model za product_sizes tablicu
type ProductSize struct {
	ID        uint     `gorm:"primaryKey;autoIncrement" json:"id"`
	ProductID uint     `gorm:"column:productId;type:int;not null;index" json:"productId"`
	Size      string   `gorm:"type:varchar(255);not null" json:"size"`
	Product   *Product `gorm:"constraint:OnDelete:CASCADE;"` // veza na Product (belongs to)
}
