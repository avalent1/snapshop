package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func parseToken(tokenStr string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		// Provjeri da se koristi HMAC algoritam
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, jwt.ErrTokenMalformed
	}

	return claims, nil
}

func AdminAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Dohvati token iz zaglavlja
		tokenString := c.GetHeader("token")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
			c.Abort()
			return
		}

		// Parsiranje i validacija JWT tokena
		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "JWT secret not set"})
			c.Abort()
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Provjeri da koristi ispravni algoritam
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrSignatureInvalid
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token"})
			c.Abort()
			return
		}

		// Provjera emaila
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			email, ok := claims["email"].(string)
			if !ok || !strings.EqualFold(email, os.Getenv("ADMIN_EMAIL")) {
				c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
				c.Abort()
				return
			}
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid claims"})
			c.Abort()
			return
		}

		// Ako je sve prošlo
		c.Next()
	}
}
func AuthUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("token")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
			c.Abort()
			return
		}

		claims, err := parseToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token, Login Again"})
			c.Abort()
			return
		}

		// Pretpostavljamo da token sadrži "id" claim
		userID, ok := claims["id"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token payload"})
			c.Abort()
			return
		}

		c.Set("userID", uint(userID))
		c.Next()
	}
}

func AuthUser1() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if !strings.HasPrefix(auth, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Not Authorized, Login Again"})
			c.Abort()
			return
		}

		token := strings.TrimPrefix(auth, "Bearer ")

		claims, err := parseToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token, Login Again"})
			c.Abort()
			return
		}

		userID, ok := claims["id"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": "Invalid token payload"})
			c.Abort()
			return
		}

		c.Set("userID", uint(userID))
		c.Next()
	}
}

func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if !strings.HasPrefix(auth, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}

		token := strings.TrimPrefix(auth, "Bearer ")

		claims, err := parseToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token"})
			c.Abort()
			return
		}

		// spremamo cijeli payload
		c.Set("user", claims)
		c.Next()
	}
}
