package models

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"encoding/json"
	"errors"
	"time"
)

type UserToken struct {
	// 会关联上用户的ID
	Id string

	// token的过期时间
	Exp time.Time
}

// 生成新的用户token
func NewUserToken(id string, exp time.Time) *UserToken {
	return &UserToken{
		Id:  id,
		Exp: exp,
	}
}

// 通过string构建token
func NewUserTokenFromCipher(cipherStr string) (*UserToken, error) {
	token := new(UserToken)

	if cipherStr == "" {
		return token, errors.New("请先登录")
	}

	hexTokenCipherSlice, err := hex.DecodeString(cipherStr)
	if err != nil {
		return token, err
	}

	tokenOriginSlice, err := aesDecode(hexTokenCipherSlice)
	if err != nil {
		return token, err
	}

	err = json.Unmarshal(tokenOriginSlice, &token)
	if err != nil {
		return token, err
	}

	return token, nil
}

// 对用户token进行加密, 获取到所对应的字符串
func (ut *UserToken) Encrypt() (string, error) {
	jsonByteSlice, err := json.Marshal(ut)
	if err != nil {
		return "", err
	}

	// 加密
	tokenCipherByte, err := aesEncode(jsonByteSlice)
	if err != nil {
		return "", err
	}

	return byteSlice2HexStr(tokenCipherByte), nil
}

// 使用aes算法来进行加密
func aesEncode(text []byte) ([]byte, error) {
	cipherSize, blockMode, err := getCipherBlockAndCipherSize(true)

	if err != nil {
		return nil, err
	}

	text = pkcs7Padding(text, cipherSize)

	result := make([]byte, len(text))
	blockMode.CryptBlocks(result, text)
	return result, nil
}

func aesDecode(text []byte) ([]byte, error) {
	_, blockMode, err := getCipherBlockAndCipherSize(false)

	if err != nil {
		return nil, err
	}

	resultSlice := make([]byte, len(text))
	blockMode.CryptBlocks(resultSlice, text)
	resultSlice = pkcs7UnPadding(resultSlice)
	return resultSlice, nil
}

// 获取到密钥的一些信息
func getCipherBlockAndCipherSize(isEncode bool) (int, cipher.BlockMode, error) {
	tokenSalt := []byte("zhenzhjayupeaalways_34109348_wew")
	cipherBlock, err := aes.NewCipher(tokenSalt)
	if err != nil {
		return 0, nil, err
	}

	var cipherMode cipher.BlockMode

	cipherSize := cipherBlock.BlockSize()
	if isEncode {
		cipherMode = cipher.NewCBCEncrypter(cipherBlock, tokenSalt[:cipherSize])
	} else {
		cipherMode = cipher.NewCBCDecrypter(cipherBlock, tokenSalt[:cipherSize])
	}
	return cipherSize, cipherMode, nil
}

// 补位
func pkcs7Padding(text []byte, blockSize int) []byte {
	padding := blockSize - len(text)%blockSize
	otherText := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(text, otherText...)
}

// 取出补位
func pkcs7UnPadding(text []byte) []byte {
	length := len(text)
	del := int(text[length-1])
	return text[:(length - del)]
}

func byteSlice2HexStr(byteSlice []byte) string {
	result := hex.EncodeToString(byteSlice)
	return result
}
