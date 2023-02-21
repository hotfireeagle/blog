package restful

type StatusCode int

const (
	Err StatusCode = iota
	Success
)

type Response struct {
	Status StatusCode  `json:"status"`
	Data   interface{} `json:"data"`
	Msg    string      `json:"msg"`
}

func newErrorResponse(reason string) *Response {
	return &Response{
		Status: Err,
		Msg:    reason,
	}
}

func newOkResponse(data interface{}) *Response {
	return &Response{
		Status: Success,
		Data:   data,
	}
}
