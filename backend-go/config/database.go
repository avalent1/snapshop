package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/joho/godotenv"
)

var DB *gorm.DB

// InitDatabase loads .env (if present) and opens a pooled connection
func InitDatabase() {
	// Load variables from .env (harmless if .env is missing in prod)
	_ = godotenv.Load()

	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST") // e.g. "127.0.0.1:3306"
	dbName := os.Getenv("DB_NAME")
	if dbUser == "" || dbPass == "" || dbHost == "" || dbName == "" {
		log.Fatal("database env vars missing; check .env")
	}

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPass, dbHost, dbName,
	)

	// Configure custom logger (equivalent to logging: false in Sequelize)
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Silent, // change to logger.Info while debugging
			Colorful:      true,
		},
	)

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
		// PrepStmt: true, // enable prepared‑statement caching if desired
	})

	if err != nil {
		log.Fatalf("could not connect to database: %v", err)
	}

	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("failed to get generic DB object: %v", err)
	}

	// --- Connection pool settings (mirrors Sequelize pool options) ---
	sqlDB.SetMaxIdleConns(0)                   // -> min: 0
	sqlDB.SetMaxOpenConns(5)                   // -> max: 5
	sqlDB.SetConnMaxIdleTime(10 * time.Second) // -> idle: 10000 ms
	//-----------------------------------------------------------------
	log.Println("database connection established")

	// ✅ Migracije modela

}
