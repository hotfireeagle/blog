package tools

import (
	"encoding/json"
	"os"
)

func GetSecretValue(key string) string {
	secretFilePath := "/Users/smallhai/learn/gitRepo/blog/secret.json"

	data, err := os.ReadFile(secretFilePath)

	if err != nil {
		panic(err)
	}

	var jsonData map[string]string

	err = json.Unmarshal(data, &jsonData)

	if err != nil {
		panic(err)
	}

	return jsonData[key]
}
