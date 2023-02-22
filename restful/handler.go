package restful

import (
	"blog/dblayer"
	"blog/models"
	"blog/tools"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HandlerInterface interface {
	GetArticles(c *gin.Context)
	GetArticleDetail(c *gin.Context)
	CreateArticle(c *gin.Context)

	LoginUser(c *gin.Context)
	RegisterUser(c *gin.Context)
}

type Handler struct {
	db dblayer.DBLayer
}

func NewHandler() (*Handler, error) {
	h := new(Handler)
	dsn := tools.GetSecretValue("mysql_dsn")
	db, err := dblayer.NewORM(dsn)
	if err != nil {
		return h, err
	}
	h.db = db
	return h, nil
}

func (h *Handler) GetArticles(c *gin.Context) {
	if h.db == nil {
		return
	}

	var queryArticleListParam models.QueryArticleListParam
	err := c.ShouldBindJSON(&queryArticleListParam)

	if err != nil {
		c.JSON(http.StatusBadRequest, newErrorResponse(err.Error()))
		return
	}

	articles, err := h.db.SelectArticles(queryArticleListParam.Page, queryArticleListParam.PageSize)

	if err != nil {
		c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, newOkResponse(articles))
}

func (h *Handler) GetArticleDetail(c *gin.Context) {
	if h.db == nil {
		return
	}

	articleId := c.Param("articleId")

	articleDetail, err := h.db.SelectArticleById(articleId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, newOkResponse(articleDetail))
}

func (h *Handler) CreateArticle(c *gin.Context) {
	if h.db == nil {
		return
	}

	articleObj := new(models.Article)
	err := c.ShouldBindJSON(articleObj)

	if err != nil {
		c.JSON(http.StatusBadRequest, newErrorResponse(err.Error()))
		return
	}

	uuid, err := h.db.InsertArticle(articleObj)

	if err != nil {
		c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, newOkResponse(uuid))
}
