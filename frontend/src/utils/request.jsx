const prefix = "/api"
const ErrStatus = 0

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
        // TODO:
        reject(data)
      }
      resolve(data)
    }).catch(reject)
  })
}