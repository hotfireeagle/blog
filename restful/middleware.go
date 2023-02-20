package restful

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func MyCustomMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println(">>>>>>>")
		c.Next()
		fmt.Println("+++++++")
	}
}
