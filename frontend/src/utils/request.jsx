const prefix = "/api"
const ErrStatus = 0

const errHandler = alert

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => {
      return response.json()
    }).then(resObj => {
      const { msg, status, data } = resObj
      if (status === ErrStatus) {
        errHandler(msg)
        reject(data)
      }
      resolve(data)
    }).catch(reject)
  })
}

export const get = url => {
  return new Promise((resolve, reject) => {
    fetch(prefix + url).then(res => {
      return res.json()
    }).then(resObj => {
      const { msg, status, data } = resObj
      if (status === ErrStatus) {
        errHandler(msg)
        reject(data)
      }
      resolve(data)
    }).catch(reject)
  })
}