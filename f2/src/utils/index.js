/**
 * 格式化时间进行展示
 * @param {*} str 
 */
export const dateFormat2ui = str => {
  const dateObj = new Date(str)
  let month = dateObj.getMonth()
  if (month < 10) {
    month = "0" + month
  }
  let date = dateObj.getDate()
  if (date < 10) {
    date = "0" + date
  }
  const createDateStr = dateObj.getFullYear() + "/" + month + "/" + date
  return createDateStr
}