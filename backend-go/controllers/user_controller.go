package controllers

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/avalent1/snapshop/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type loginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type registerRequest struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func createToken(userID uint) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return "", fmt.Errorf("JWT secret is not set")
	}

	claims := jwt.MapClaims{
		"id":  userID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// RegisterUser returns a gin.HandlerFunc for user registration
func RegisterUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req registerRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid request"})
			return
		}

		var existingUser models.User
		if err := db.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
			// found existing user
			c.JSON(http.StatusConflict, gin.H{"success": false, "message": "User already exists"})
			return
		} else if err != gorm.ErrRecordNotFound {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Server error"})
			return
		}

		if !govalidator.IsEmail(req.Email) {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Please enter a valid email"})
			return
		}

		if len(req.Password) < 8 {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Please enter a strong password"})
			return
		}

		hashedPass, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Error hashing password"})
			return
		}

		user := models.User{
			Name:     req.Name,
			Email:    req.Email,
			Password: string(hashedPass),
		}

		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Error inserting user"})
			return
		}

		token, err := createToken(user.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to create token"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"success": true, "message": "User registered", "userId": user.ID, "token": token})
	}
}

// LoginUser returns a gin.HandlerFunc for user login
func LoginUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req loginRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid request"})
			return
		}

		var user models.User
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "User does not exist"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Server error"})
			}
			return
		}

		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid credentials"})
			return
		}

		token, err := createToken(user.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to create token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"success": true, "token": token})
	}
}

// AdminLogin is a standalone gin.HandlerFunc (doesn't use DB)
func AdminLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req loginRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid request"})
			return
		}

		adminEmail := os.Getenv("ADMIN_EMAIL")
		adminPass := os.Getenv("ADMIN_PASS")
		jwtSecret := os.Getenv("JWT_SECRET")

		if adminEmail == "" || adminPass == "" || jwtSecret == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Server not configured"})
			return
		}

		if req.Email == adminEmail && req.Password == adminPass {
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"email": req.Email,
				"exp":   time.Now().Add(time.Hour * 72).Unix(),
			})
			tokenString, err := token.SignedString([]byte(jwtSecret))
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to create token"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"success": true, "token": tokenString})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid credentials"})
		}
	}
}

// FetchAllUsers returns a gin.HandlerFunc for fetching all users
func FetchAllUsers(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var users []models.User

		if err := db.Find(&users).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch users"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"success": true, "users": users})
	}
}

// GetCurrentUser returns a gin.HandlerFunc to get current user from context
func GetCurrentUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userIDInterface, exists := c.Get("userID")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		userID, ok := userIDInterface.(uint)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Invalid user ID"})
			return
		}

		var user models.User
		if err := db.First(&user, userID).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Server error"})
			}
			return
		}

		c.JSON(http.StatusOK, gin.H{"success": true, "user": user})
	}
}
