package tools

import (
	"log"
	"os"
)

// 标准日志
var InfoLog = log.New(os.Stdout, "[Info]", log.LstdFlags).Println

// 错误日志
var ErrLog = log.New(os.Stderr, "[Error]", log.LstdFlags|log.Llongfile).Println
