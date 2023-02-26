package models

import "time"

type Article struct {
	Id string `gorm:"column:id" json:"id"`

	// 文章标题
	Title string `gorm:"column:title" json:"title" binding:"required"`

	// 文章内容
	Content string `gorm:"column:content" json:"content" binding:"required"`

	CreateAt time.Time `gorm:"column:create_at" json:"createAt"`

	UpdateAt time.Time `gorm:"column:update_at;default:null" json:"updateAt"`

	DeleteAt time.Time `gorm:"column:delete_at;default:null" json:"deleteAt"`
}

func (Article) TableName() string {
	return "article"
}

type QueryArticleListParam struct {
	Page     int    `json:"page"`
	PageSize int    `json:"pageSize"`
	Title    string `json:"title"`
}

type ArticleListResponse struct {
	List      []Article `json:"list"`
	Total     int64     `json:"total"`
	TotalPage int64     `json:"totalPage"`
}
