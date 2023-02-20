package models

import (
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id       string    `json:"id" gorm:"column:id"`
	Email    string    `json:"email" gorm:"column:email" binding:"required"`
	Password string    `json:"password" gorm:"column:password" binding:"required"`
	CreateAt time.Time `json:"createAt" gorm:"column:create_at"`
	UpdateAt time.Time `json:"updateAt" gorm:"column:update_at"`
	DeleteAt time.Time `json:"deleteAt" gorm:"column:delete_at"`
}

func (User) TableName() string {
	return "user"
}

func (u *User) HashPassword() error {
	if u.Password == "" {
		return errors.New("密码为空")
	}

	sBytes := []byte(u.Password)

	hashedBytes, err := bcrypt.GenerateFromPassword(sBytes, bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	u.Password = string(hashedBytes)

	return nil
}
