package controllers

import (
	"fmt"
	"net/http"

	"github.com/avalent1/snapshop/repositories"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CartRequest struct {
	ItemID   int    `json:"itemId"`
	Size     string `json:"size"`
	Quantity int    `json:"quantity"`
}

// POST /cart/add
func AddToCart(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req CartRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}

		userID := c.GetInt("userId")

		existingItem, err := repositories.FindCartItem(userID, req.ItemID, req.Size)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}

		if existingItem != nil {
			if err := repositories.IncrementCartItemQuantity(userID, req.ItemID, req.Size); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to increment quantity"})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "Quantity updated."})
		} else {
			if err := repositories.InsertCartItem(userID, req.ItemID, req.Size); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add item to cart"})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "Item added to cart."})
		}
	}
}

// PUT /cart/update
func UpdateCart(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req CartRequest
		if err := c.ShouldBindJSON(&req); err != nil || req.Quantity <= 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}

		userID := c.GetInt("userId")

		existingItem, err := repositories.FindCartItem(userID, req.ItemID, req.Size)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}
		if existingItem == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Item not found in cart."})
			return
		}

		if err := repositories.UpdateCartItemQuantity(userID, req.ItemID, req.Size, req.Quantity); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update quantity"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Quantity updated successfully."})
	}
}

// POST /cart/get
func GetUserCart(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetInt("userId")
		fmt.Println("user id je: ", userID)
		detailedItems, err := repositories.GetDetailedCartItems(userID)
		//cartItems, err := repositories.GetCartItemsByUser(db, userID)
		if err != nil {
			fmt.Printf("Error retrieving cart items: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"cartData": detailedItems})
	}
}

// DELETE /cart/remove
func RemoveFromCart(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req CartRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}

		userID := c.GetInt("userId")

		existingItem, err := repositories.FindCartItem(userID, req.ItemID, req.Size)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}
		if existingItem == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Item not found in cart."})
			return
		}

		if err := repositories.DeleteCartItem(userID, req.ItemID, req.Size); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete item"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Item removed from cart."})
	}
}
