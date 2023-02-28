const fs = require("fs")
const path = require("path")
const prompt = require("prompt")
const axios = require("axios").default
const { marked } = require("marked")

const api_host = {
  dev: "http://127.0.0.1:8000",
  production: "",
}
const article_dir = [
  "/Users/smallhai/Documents/哈利路亚/前端题目",
  "/Users/smallhai/Documents/哈利路亚/LeetCode"
]
const localFilePaths = []
let global_dev, global_token

/**
 * 获取本地的所有markdown文件
 * @param {*} prefixPath : 本地markdown知识库根目录 
 */
const getAllFileFromRootPath = prefixPath => {
  const fileStat = fs.statSync(prefixPath)
  if (fileStat.isDirectory()) {
    const fileOrDirList = fs.readdirSync(prefixPath)
    for (let dirname of fileOrDirList) {
      if (dirname.startsWith(".")) {
        continue
      }
      const fileOrDirPath = path.join(prefixPath, dirname)
      getAllFileFromRootPath(fileOrDirPath)
    }
  } else {
    localFilePaths.push(prefixPath)
  }
}

const resolveHost = () => api_host[global_dev] + "/api/bms"

/**
 * 登录后台管理系共同
 * @param {*} account : 后台管理系统账号
 * @param {*} password : 密码
 * @return {string} token : 登录凭证
 */
const loginBmsHandler = (account, password) => {
  const host = resolveHost()
  const loginApi = host + "/user/login"
  const postData = {
    email: account,
    password,
  }
  return axios.post(loginApi, postData).then(response => {
    return response.data.data
  })
}

/**
 * 获取远程的所有markdown文件
 * @param {*} token : token
 */
const getAllRemoteFiles = (token) => {
  let host = resolveHost()
  const api = host + "/article/list"
  const postData = { page: 1, pageSize: 100000 }
  return axios({
    url: api,
    method: "post",
    headers: { token },
    data: postData,
  }).then(response => {
    const allArticle = response.data.data.list
    const obj = {}
    allArticle.forEach(fileObj => {
      obj[fileObj.title] = true
    })
    return obj
  }).catch(err => {
    console.log(err.response?.data)
  })
}

/**
 * 如果当前本地文件在远程不存在的话，那么上传
 * @param {*} obj 
 */
const sync2RemoteHandler = async obj => {
  for (let absolutePath of localFilePaths) {
    let fileName = absolutePath.substr(absolutePath.lastIndexOf("/") + 1)
    fileName = fileName.split('.')[0]
    fileName = fileName.substr(fileName.indexOf('、') + 1)
    if (!obj[fileName]) {
      try {
        await uploadHandler(fileName, absolutePath)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

/**
 * 文件上传
 * @param {*} fileName : 文件名
 * @param {*} path : 文件绝对路径
 * @returns 
 */
const uploadHandler = (fileName, path) => {
  const fileContent = fs.readFileSync(path, "utf8")
  const postData = {
    title: fileName,
    content: marked.parse(fileContent),
  }
  if (!postData.content) {
    return
  }
  const host = resolveHost()
  const api = host + "/article/new"
  return axios({
    url: api,
    method: "post",
    headers: { token: global_token },
    data: postData,
  }).then(() => {
    console.log("上传成功")
  })
}

const main = async () => {
  const { dev, account, password } = await prompt.get(["dev", "account", "password"])
  global_dev = dev
  global_token = await loginBmsHandler(account, password)
  const remoteMap = await getAllRemoteFiles(global_token)
  article_dir.forEach(getAllFileFromRootPath)
  sync2RemoteHandler(remoteMap)
}

main()