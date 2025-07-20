package models

// Product represents the `products` table.
//
// ┌──────────────┐          ┌────────────────┐
// │  products    │ 1    ✱  │ product_images │
// └──────────────┘          └────────────────┘
//
// ┌──────────────┐          ┌────────────────┐
// │  products    │ 1    ✱  │ product_sizes  │
// └──────────────┘          └────────────────┘
type Product struct {
	ID          uint           `gorm:"primaryKey;autoIncrement;type:int" json:"id"`
	Name        string         `gorm:"type:varchar(255);not null" json:"name"`
	Description string         `gorm:"type:text" json:"description"`
	Price       float64        `gorm:"type:decimal(10,2);not null" json:"price"`
	Category    string         `gorm:"type:varchar(255)" json:"category"`
	SubCategory string         `gorm:"column:subCategory;type:varchar(255)" json:"subCategory"`
	Bestseller  bool           `gorm:"default:false" json:"bestseller"`
	Images      []ProductImage `gorm:"foreignKey:ProductID;constraint:OnDelete:CASCADE;" json:"images"`
	Sizes       []ProductSize  `gorm:"foreignKey:ProductID;constraint:OnDelete:CASCADE;" json:"sizes"`
}
