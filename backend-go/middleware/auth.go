package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type AdminClaims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

// CustomClaims predstavlja payload tokena (isti kao payload iz Node.js: { id: number, ... })
type CustomClaims struct {
	ID int `json:"id"`
	jwt.RegisteredClaims
}

// AuthUser je kao prva middleware funkcija - čita token iz `headers.token`
func AuthUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenHeader := c.GetHeader("token")
		if tokenHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
			c.Abort()
			return
		}

		claims := &CustomClaims{}
		token, err := jwt.ParseWithClaims(tokenHeader, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token, Login Again"})
			c.Abort()
			return
		}

		c.Set("userId", claims.ID)
		c.Next()
	}
}

// AuthUser1 je kao druga verzija - koristi `Authorization: Bearer <token>`
func AuthUser1() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		fmt.Println("Auth header: ", authHeader)
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		claims := &CustomClaims{}
		fmt.Println("Decoded ID from JWT:", claims.ID)
		fmt.Println("Token:", tokenString)

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token, Login Again"})
			c.Abort()
			return
		}
		fmt.Println("Decoded ID from JWT:", claims.ID)
		c.Set("userId", claims.ID)
		c.Next()
	}
}

// Authenticate je treća verzija - stavlja cijeli decoded payload u kontekst

func AdminAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenHeader := c.GetHeader("token")
		if tokenHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
			c.Abort()
			return
		}

		claims := &AdminClaims{}
		token, err := jwt.ParseWithClaims(tokenHeader, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token, Login Again"})
			c.Abort()
			return
		}

		if claims.Email != os.Getenv("ADMIN_EMAIL") {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
			c.Abort()
			return
		}

		c.Next()
	}
}
