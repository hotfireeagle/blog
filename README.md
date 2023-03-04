### 介绍

非常简易的博客系统：在本地利用任意写markdown的软件的编辑文章（这里使用Obsidian），然后运行cli可同步到服务器上。不做在后台管理系统上去编辑新增文章的原因：费时还可能编辑体验不好用。
     
相关技术框架：React + Solidjs + Gin + Mysql + GORM + Nodejs

### 如何运行

+ 安装Mysql
+ 安装Node.js
+ 根据project.sql相关语句建库、表
+ go run main.go启动后端
+ cd到相应前端项目(npm run dev)
     
### 目录介绍

```txt
├── bms: 前端后台管理系统所在工程目录，使用ant-design-pro脚手架
├── cli: 把本地文章同步到Mysql命令行工具，使用Nodejs的prompt
├── dblayer: 数据库的增上改查逻辑代码，使用GORM
├── frontend: 前端博客平台，使用Solidjs，前端博客复杂性很低，这里为了速度考虑使用Solidjs
├── models: 对象建模
├── project.sql: mysql建库、建表语句
├── restful: api注册以及handler
├── secret.json: 密钥文件，注：被git ignore了，需自己加自己的密码
└── tools: 工具封装
```

### demo展示
[![ppiOd7q.png](https://s1.ax1x.com/2023/03/01/ppiOd7q.png)](https://imgse.com/i/ppiOd7q)