package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/avalent1/snapshop/config"
	"github.com/avalent1/snapshop/routes"
	"github.com/avalent1/snapshop/utils"
)

func main() {
	// Učitaj .env
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ .env file not found. Using default environment.")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "4001"
	}

	// Inicijalizacija Cloudinary-a
	_, err := utils.ConnectCloudinary()
	if err != nil {
		log.Fatal("❌ Failed to initialize Cloudinary:", err)
	}

	// Inicijalizacija baze
	config.InitDatabase()
	db := config.DB

	// Inicijalizacija Gin servera
	router := gin.Default()

	// Middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	// API route group
	api := router.Group("/api")
	{
		routes.RegisterProductRoutes(api, db)
		// routes.UserRoutes(api, db)
		// routes.CartRoutes(api, db)
	}

	// Test ruta
	router.GET("/", func(c *gin.Context) {
		c.String(200, "API working")
	})

	// Start server
	log.Printf("🚀 Server running on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("❌ Failed to start server:", err)
		fmt.Println("Failed to start server")
	}
}
