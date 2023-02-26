package restful

import (
	"github.com/gin-gonic/gin"
)

func RunAPI(address string) error {
	h, err := NewHandler()

	if err != nil {
		return err
	}

	return RunAPIWithHandler(address, h)
}

func RunAPIWithHandler(address string, h HandlerInterface) error {
	r := gin.Default() // gin engine object

	apiGroup := r.Group("/api")

	articleGroup := apiGroup.Group("/article")
	articleGroup.POST("/list", h.GetArticles)
	articleGroup.GET("/detail/:articleId", h.GetArticleDetail)
	articleGroup.POST("/new", h.CreateArticle)

	bmsGroup := apiGroup.Group("/bms")
	bmsGroup.Use(AuthMiddleware(h))

	bmsUserGroup := bmsGroup.Group("/user")
	bmsUserGroup.POST("/new", h.RegisterUser)
	bmsUserGroup.POST("/login", h.LoginUser)

	bmsArticleGroup := bmsGroup.Group("/article")
	bmsArticleGroup.POST("/list", h.GetArticles)

	return r.Run(address)
}
