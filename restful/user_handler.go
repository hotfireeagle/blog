package restful

import (
	"blog/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func (h *Handler) LoginUser(c *gin.Context) {
	if h.db == nil {
		return
	}

	userObj := new(models.User)
	err := c.ShouldBindJSON(userObj)

	if err != nil {
		c.JSON(http.StatusBadRequest, newErrorResponse(err.Error()))
		return
	}

	dbUser, err := h.db.SelectUserByEmail(userObj.Email)

	if err != nil {
		c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
		return
	}

	err = userObj.HashPassword()
	if err != nil {
		c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
		return
	}

	if dbUser.Password != userObj.Password {
		c.JSON(http.StatusOK, newErrorResponse("密码错误"))
		return
	}

	userToken := models.NewUserToken(dbUser.Id, time.Now().Add(time.Hour*24))
	tokenStr, err := userToken.Encrypt()

	if err != nil {
		c.JSON(http.StatusOK, newErrorResponse(err.Error()))
		return
	}

	c.JSON(http.StatusOK, newOkResponse(tokenStr))
}
