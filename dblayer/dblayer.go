package dblayer

import "blog/models"

type DBLayer interface {
	SelectArticles(int, int) ([]models.Article, error)
	SelectArticleById(string) (models.Article, error)
	InsertArticle(*models.Article) (string, error)

	SelectUserByEmail(string) (*models.User, error)
	InsertUser(*models.User) (string, error)
	SelectUserById(string) (*models.User, error)
}
