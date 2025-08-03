package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDatabase() {
	_ = godotenv.Load()
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	if dbUser == "" || dbPass == "" || dbHost == "" || dbName == "" {
		log.Fatal("database env vars missing; check .env")
	}
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPass, dbHost, dbName,
	)
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Silent,
			Colorful:      true,
		},
	)
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		log.Fatalf("could not connect to database: %v", err)
	}
	sqlDB, err := DB.DB()
	// --- Connection pool settings
	sqlDB.SetMaxIdleConns(0)
	sqlDB.SetMaxOpenConns(5)
	sqlDB.SetConnMaxIdleTime(10 * time.Second)
	log.Println("database connection established")
}
