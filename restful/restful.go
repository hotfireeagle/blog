package restful

import "github.com/gin-gonic/gin"

func RunAPI(address string) error {
	h, err := NewHandler()

	if err != nil {
		return err
	}

	return RunAPIWithHandler(address, h)
}

func RunAPIWithHandler(address string, h HandlerInterface) error {
	r := gin.Default() // gin engine object
	r.Use(MyCustomMiddleware())

	apiGroup := r.Group("/api")

	articleGroup := apiGroup.Group("/article")
	articleGroup.POST("/list", h.GetArticles)
	articleGroup.GET("/detail/:articleId", h.GetArticleDetail)
	articleGroup.POST("/new", h.CreateArticle)

	userGroup := apiGroup.Group("/user")
	userGroup.POST("/new", h.RegisterUser)
	userGroup.POST("/login", h.LoginUser)

	return r.Run(address)
}
