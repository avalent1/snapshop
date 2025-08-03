package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/avalent1/snapshop/controllers"
	"github.com/avalent1/snapshop/middleware"
)

func ProductRoutes(rg *gin.RouterGroup, db *gorm.DB) {
	productGroup := rg.Group("/product")

	productGroup.POST("/add",
		middleware.AdminAuth(),
		controllers.AddProduct(db),
	)

	productGroup.POST("/remove",
		controllers.RemoveProduct(db),
	)

	productGroup.POST("/single",
		controllers.SingleProduct(db),
	)

	productGroup.GET("/list",
		controllers.ListProducts(db),
	)
}
