package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/avalent1/snapshop/controllers"
	"github.com/avalent1/snapshop/middleware"
)

func RegisterProductRoutes(rg *gin.RouterGroup, db *gorm.DB) {
	productGroup := rg.Group("/product")

	// Add product (POST /products/add)
	productGroup.POST("/add",
		middleware.AdminAuth(),     // JWT auth middleware
		controllers.AddProduct(db), // Controller for creation
	)

	// Remove product (POST /products/remove)
	productGroup.POST("/remove",
		controllers.RemoveProduct(db),
	)

	// Single product (POST /products/single)
	productGroup.POST("/single",
		controllers.SingleProduct(db),
	)

	// List all products (GET /products/list)
	productGroup.GET("/list",
		controllers.ListProducts(db),
	)
}
