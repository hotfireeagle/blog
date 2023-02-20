package models

import "time"

type Tag struct {
	Id       string    `json:"id" gorm:"column:id"`
	Name     string    `json:"name" gorm:"column:name" binding:"required"`
	CreateAt time.Time `json:"createAt" gorm:"column:create_at"`
	UpdateAt time.Time `json:"updateAt" gorm:"column:update_at;default:null"`
	DeleteAt time.Time `json:"deleteAt" gorm:"column:delete_at;default:null"`
}
