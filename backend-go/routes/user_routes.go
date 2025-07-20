package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/avalent1/snapshop/controllers"
	"github.com/avalent1/snapshop/middleware"
)

func UserRoutes(rg *gin.RouterGroup, db *gorm.DB) {
	userGroup := rg.Group("/user")

	userGroup.POST("/register", controllers.RegisterUser(db))
	userGroup.POST("/login", controllers.LoginUser(db))
	userGroup.POST("/admin", controllers.AdminLogin())
	userGroup.GET("/all", middleware.AdminAuth(), controllers.FetchAllUsers(db))
	userGroup.GET("/me", controllers.GetCurrentUser(db))
}
