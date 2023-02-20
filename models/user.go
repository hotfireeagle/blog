package models

import "time"

type User struct {
	Id       string    `json:"id" gorm:"column:id"`
	Email    string    `json:"email" gorm:"column:email"`
	Password string    `json:"password" gorm:"column:password"`
	CreateAt time.Time `json:"createAt" gorm:"column:create_at"`
	UpdateAt time.Time `json:"updateAt" gorm:"column:update_at"`
	DeleteAt time.Time `json:"deleteAt" gorm:"column:delete_at"`
}

func (User) TableName() string {
	return "user"
}

type UserLoginParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
