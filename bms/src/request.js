import { request } from "umi"

const prefix = "/api"

export const post = (url, data) => {
  return request(prefix + url, {
    method: "post",
    data,
  })
}