package routes

import (
	"github.com/avalent1/snapshop/controllers"
	"github.com/avalent1/snapshop/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CartRoutes(rg *gin.RouterGroup, db *gorm.DB) {
	cart := rg.Group("/cart")

	cart.POST("/get", middleware.AuthUser1(), controllers.GetUserCart(db))
	cart.POST("/add", middleware.AuthUser(), controllers.AddToCart(db))
	cart.POST("/update", middleware.AuthUser(), controllers.UpdateCart(db))
	cart.DELETE("/remove", middleware.AuthUser(), controllers.RemoveFromCart(db))
}
