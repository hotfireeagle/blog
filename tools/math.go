package tools

func DivCeil(a int64, b int64) int64 {
	r := a / b
	if r*b != a {
		return r + 1
	}
	return r
}
