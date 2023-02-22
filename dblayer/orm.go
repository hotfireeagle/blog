package dblayer

import (
	"blog/models"
	"time"

	"github.com/google/uuid"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DBORM struct {
	*gorm.DB
}

// dsn likes "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
func NewORM(dsn string) (*DBORM, error) {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return &DBORM{DB: db}, err
}

func (db *DBORM) SelectArticles(page int, size int) (articles []models.Article, err error) {
	return articles, db.Find(&articles).Error
}

func (db *DBORM) SelectArticleById(id string) (article models.Article, err error) {
	return article, db.First(&article, id).Error
}

func (db *DBORM) InsertArticle(article *models.Article) (string, error) {
	article.Id = uuid.NewString()
	article.CreateAt = time.Now()
	result := db.Create(article)
	return article.Id, result.Error
}

func (db *DBORM) SelectUserByEmail(email string) (*models.User, error) {
	result := db.Table("user").Where(&models.User{Email: email})
	uobj := new(models.User)
	res := result.Find(uobj)
	return uobj, res.Error
}

func (db *DBORM) InsertUser(user *models.User) (string, error) {
	user.Id = uuid.NewString()
	user.CreateAt = time.Now()
	result := db.Create(user)
	return user.Id, result.Error
}
