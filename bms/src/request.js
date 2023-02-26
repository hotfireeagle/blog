import { history } from "@umijs/max"
import axios from "axios"
import { message } from "antd"
import { tokenStore } from "@/utils/localStorage"

const prefix = "/api/bms"

const NEED_LOGIN = 403

const instance = axios.create({
  headers: {
    token: tokenStore.get(),
  },
})

instance.interceptors.response.use(res => {
  const resData = res?.data
  if (resData?.msg !== "") {
    message.warning(msg)
    return Promise.reject(resData)
  }
  return Promise.resolve(resData?.data)
}, err => {
  const msg = err?.response?.data?.msg
  if (msg !== "") {
    message.warning(msg)
  }
  if (err.response.status === NEED_LOGIN) {
    history.push("/user/login")
  }
  return Promise.reject(err)
})

export const post = (url, data) => {
  return instance.post(prefix + url, data)
}

export const get = (url) => {
  return instance.get(prefix + url)
}