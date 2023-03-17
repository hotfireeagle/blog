// FIXME: if server don't support cors, there shoud support client fetch in development time use the server proxy
const prefix = "http://127.0.0.1:8000/api"
const ErrStatus = 0

// TODO: does the next.js provide fetch？

const errHandler = typeof alert != "undefined" ? alert : console.log

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