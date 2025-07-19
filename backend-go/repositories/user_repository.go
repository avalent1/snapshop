package repositories

import (
	"errors"

	"github.com/avalent1/snapshop/models"
	"gorm.io/gorm"
)

// ------------
//  MODELI
// ------------

// ------------
//  REPO METODE
// ------------

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

// Pronalaženje korisnika po e‑mailu (uključuje Cart podatke)
func (r *UserRepository) FindUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Preload("CartData").Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	return &user, err
}

// Umetanje korisnika, vraća ID novog zapisa
func (r *UserRepository) InsertUser(name, email, hashedPassword string) (uint, error) {
	user := models.User{
		Name:     name,
		Email:    email,
		Password: hashedPassword,
	}
	if err := r.db.Create(&user).Error; err != nil {
		return 0, err
	}
	return user.ID, nil
}

// Dohvati sve korisnike (bez lozinke)
func (r *UserRepository) GetAllUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Select("id", "name", "email").Find(&users).Error
	return users, err
}

// Dohvati korisnika po ID‑u (bez lozinke)
func (r *UserRepository) GetUserByID(id uint) (*models.User, error) {
	var user models.User
	err := r.db.Select("id", "name", "email").
		Where("id = ?", id).
		First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	return &user, err
}
