package services

import (
	"errors"
	"log"
	"mime/multipart"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"gorm.io/gorm"

	"github.com/avalent1/snapshop/models"
	"github.com/avalent1/snapshop/utils"
)

type NewProductDTO struct {
	Name        string
	Description string
	Price       float64
	Category    string
	SubCategory string
	Bestseller  bool
	Sizes       []string
}

// CreateProductWithAssets creates product with images and sizes inside a transaction
func CreateProductWithAssets(db *gorm.DB, data NewProductDTO, files []*multipart.FileHeader) (*models.Product, error) {
	cld, err := utils.ConnectCloudinary()
	if err != nil {
		return nil, err
	}

	var createdProduct *models.Product

	err = db.Transaction(func(tx *gorm.DB) error {
		product := models.Product{
			Name:        data.Name,
			Description: data.Description,
			Price:       data.Price,
			Category:    data.Category,
			SubCategory: data.SubCategory,
			Bestseller:  data.Bestseller,
		}
		if err := tx.Create(&product).Error; err != nil {
			return err
		}

		for _, file := range files {
			src, err := file.Open()
			if err != nil {
				return err
			}
			defer src.Close()

			uploadRes, err := cld.Upload.Upload(tx.Statement.Context, src, uploader.UploadParams{
				Folder: "products",
			})
			if err != nil {
				return err
			}

			image := models.ProductImage{
				URL:       uploadRes.SecureURL,
				PublicID:  uploadRes.PublicID,
				ProductID: product.ID,
			}
			if err := tx.Create(&image).Error; err != nil {
				return err
			}
		}

		for _, size := range data.Sizes {
			sizeModel := models.ProductSize{
				ProductID: product.ID,
				Size:      size,
			}
			if err := tx.Create(&sizeModel).Error; err != nil {
				return err
			}
		}

		createdProduct = &product
		return nil
	})

	if err != nil {
		return nil, err
	}

	return createdProduct, nil
}

func DeleteProductByID(db *gorm.DB, productID uint) error {
	cld, err := utils.ConnectCloudinary()
	if err != nil {
		return err
	}

	return db.Transaction(func(tx *gorm.DB) error {
		var product models.Product

		if err := tx.Preload("Images").First(&product, productID).Error; err != nil {
			return errors.New("product not found")
		}

		for _, img := range product.Images {
			if img.PublicID != "" {
				_, err := cld.Upload.Destroy(tx.Statement.Context, uploader.DestroyParams{
					PublicID: img.PublicID,
				})
				if err != nil {
					log.Printf("Failed to delete image from Cloudinary: %v", err)
				}
			}
		}

		if err := tx.Delete(&product).Error; err != nil {
			return err
		}

		return nil
	})
}
