package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/avalent1/snapshop/repositories"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	repo *repositories.UserRepository
}

func NewUserController(repo *repositories.UserRepository) *UserController {
	return &UserController{repo: repo}
}

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
		return "", gin.Error{Err: http.ErrNoCookie, Type: gin.ErrorTypePrivate}
	}

	claims := jwt.MapClaims{
		"id":  userID,
		"exp": time.Now().Add(time.Hour * 72).Unix(), // token vrijedi 72h
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func (uc *UserController) LoginUser(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid request"})
		return
	}

	user, err := uc.repo.FindUserByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Server error"})
		return
	}
	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "User does not exist"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
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

func (uc *UserController) RegisterUser(c *gin.Context) {
	var req registerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid request"})
		return
	}

	exists, err := uc.repo.FindUserByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Server error"})
		return
	}
	if exists != nil {
		c.JSON(http.StatusConflict, gin.H{"success": false, "message": "User already exists"})
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

	userID, err := uc.repo.InsertUser(req.Name, req.Email, string(hashedPass))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Error inserting user"})
		return
	}

	token, err := createToken(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to create token"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": true, "message": "User registered", "userId": userID, "token": token})
}

func AdminLogin(c *gin.Context) {
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

func (uc *UserController) FetchAllUsers(c *gin.Context) {
	users, err := uc.repo.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch users"})
		return
	}
	c.JSON(http.StatusOK, users)
}

func (uc *UserController) GetCurrentUser(c *gin.Context) {
	// Ovdje pretpostavljamo da middleware postavlja userID u kontekst
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

	user, err := uc.repo.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server error"})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}
