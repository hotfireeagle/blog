# 建库
CREATE DATABASE blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# article表
CREATE TABLE article (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content LONGTEXT,
  create_at DATETIME,
  update_at DATETIME,
  delete_at DATETIME
);

# 用户表
CREATE TABLE user (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(80) NOT NULL,
  create_at DATETIME,
  update_at DATETIME,
  delete_at DATETIME
);

# 标签表
CREATE TABLE tag (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(16) NOT NULL UNIQUE,
  create_at DATETIME,
  update_at DATETIME,
  delete_at DATETIME
);