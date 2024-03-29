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

func (db *DBORM) SelectArticles(page int, size int, queryArticle *models.Article) (articles []models.Article, err error) {
	return articles, db.Limit(size).Offset((page - 1) * size).Where(queryArticle).Find(&articles).Error
}

func (db *DBORM) SelectArticleById(id string) (article models.Article, err error) {
	return article, db.First(&article, "id = ?", id).Error
}

func (db *DBORM) InsertArticle(article *models.Article) (string, error) {
	article.Id = uuid.NewString()
	article.CreateAt = time.Now()
	result := db.Create(article)
	return article.Id, result.Error
}

func (db *DBORM) CountArticle(article *models.Article) (int64, error) {
	var count int64
	result := db.Table("article").Where(article).Count(&count)
	return count, result.Error
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

func (db *DBORM) SelectUserById(id string) (*models.User, error) {
	userObj := new(models.User)
	// because our user primary key id is string, so we need put the `id=?` in the center
	// if the primary key is number, we can ignore that
	result := db.First(userObj, "id = ?", id)
	return userObj, result.Error
}
