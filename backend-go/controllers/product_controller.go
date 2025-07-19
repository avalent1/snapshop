package controllers

import (
	"fmt"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/avalent1/snapshop/models"
	"github.com/avalent1/snapshop/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ProductInput struct {
	name        string   `form:"name" binding:"required"`
	description string   `form:"description"`
	price       float64  `form:"price" binding:"required"`
	category    string   `form:"category"`
	subCategory string   `form:"subCategory"`
	bestseller  bool     `form:"bestseller"`
	sizes       []string `form:"sizes[]" binding:"required"`
}

func AddProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input ProductInput

		// Parse multipart form
		if err := c.ShouldBind(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid input", "error": err.Error()})
			return
		}

		// Handle images (image1, image2, image3)
		var images []*multipart.FileHeader
		for _, field := range []string{"image1", "image2", "image3"} {
			file, err := c.FormFile(field)
			if err == nil && file != nil {
				images = append(images, file)
			}
		}

		if len(images) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "At least one image is required"})
			return
		}

		// Call service to create product
		product, err := services.CreateProductWithAssets(db, services.NewProductDTO{
			Name:        input.name,
			Description: input.description,
			Price:       input.price,
			Category:    input.category,
			SubCategory: input.subCategory,
			Bestseller:  input.bestseller,
			Sizes:       input.sizes,
		}, images)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Product creation failed", "error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"success":   true,
			"productId": product.ID,
			"message":   "Product created successfully",
		})
	}
}

func ListProducts(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var products []models.Product

		if err := db.Preload("Images").Preload("Sizes").Find(&products).Error; err != nil {
			fmt.Println("DB Error:", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Server error fetching products"})
			return
		}

		// Force initialize empty slices to avoid nil on frontend
		for i := range products {
			if products[i].Images == nil {
				products[i].Images = []models.ProductImage{}
			}
			if products[i].Sizes == nil {
				products[i].Sizes = []models.ProductSize{}
			}
		}

		c.JSON(http.StatusOK, gin.H{"success": true, "products": products})
	}
}

func RemoveProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id") // assuming /products/:id
		id, err := strconv.Atoi(idStr)
		if err != nil || id <= 0 {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid product ID"})
			return
		}

		err = services.DeleteProductByID(db, uint(id))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
	}
}

func SingleProduct(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil || id <= 0 {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid product ID"})
			return
		}

		var product models.Product
		if err := db.Preload("Images").Preload("Sizes").First(&product, id).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Server error fetching product"})
			}
			return
		}

		c.JSON(http.StatusOK, product)
	}
}
