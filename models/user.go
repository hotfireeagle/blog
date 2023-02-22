package models

import (
	"crypto/sha256"
	"encoding/hex"
	"time"
)

type User struct {
	Id       string    `json:"id" gorm:"column:id"`
	Email    string    `json:"email" gorm:"column:email" binding:"required"`
	Password string    `json:"password" gorm:"column:password" binding:"required"`
	CreateAt time.Time `json:"createAt" gorm:"column:create_at"`
	UpdateAt time.Time `json:"updateAt" gorm:"column:update_at;default:null"`
	DeleteAt time.Time `json:"deleteAt" gorm:"column:delete_at;default:null"`
}

func (User) TableName() string {
	return "user"
}

func (u *User) HashPassword() {
	sumArr := sha256.Sum256([]byte(u.Password))
	u.Password = hex.EncodeToString(sumArr[:])
}
