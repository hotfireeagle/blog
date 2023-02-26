package restful

import (
	"blog/models"
	"blog/tools"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(h HandlerInterface) gin.HandlerFunc {
	return func(c *gin.Context) {
		whiteListMap := map[string]bool{
			"/api/bms/user/login": true,
		}
		if whiteListMap[c.FullPath()] {
			return
		}

		token := c.Request.Header.Get("token")

		if token == "" {
			c.JSON(http.StatusForbidden, newErrorResponse("不存在token,请登录"))
			c.Abort()
			return
		}

		userObj, err := models.NewUserTokenFromCipher(token)
		if err != nil {
			tools.ErrLog(err)
			c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
			c.Abort()
			return
		}

		if userObj.Exp.Before(time.Now()) {
			c.JSON(http.StatusForbidden, newErrorResponse("登录已过期,请重新登录"))
			c.Abort()
			return
		}

		hs, ok := h.(*Handler)
		if !ok {
			tools.ErrLog(err)
			c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
			c.Abort()
			return
		}

		dbUser, err := hs.db.SelectUserById(userObj.Id)
		if err != nil {
			tools.ErrLog(err)
			c.JSON(http.StatusInternalServerError, newErrorResponse(err.Error()))
			c.Abort()
			return
		}

		if dbUser.Id != userObj.Id {
			c.JSON(http.StatusForbidden, newErrorResponse("用户不存在,请重新登录"))
			c.Abort()
			return
		}
	}
}
