package restful

import (
	"blog/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) LoginUser(c *gin.Context) {
	if h.db == nil {
		return
	}

	userObj := new(models.User)
	err := c.ShouldBindJSON(userObj)

	if err != nil {
		c.JSON(http.StatusBadRequest, NewErrorResponse(err.Error()))
		return
	}

	dbUser, err := h.db.SelectUserByEmail(userObj.Email)

	if err != nil {
		c.JSON(http.StatusInternalServerError, NewErrorResponse(err.Error()))
		return
	}

	err = userObj.HashPassword()
	if err != nil {
		c.JSON(http.StatusInternalServerError, NewErrorResponse(err.Error()))
		return
	}

	if dbUser.Password != userObj.Password {
		c.JSON(http.StatusOK, NewErrorResponse("密码错误"))
		return
	}

	// TODO:
}
