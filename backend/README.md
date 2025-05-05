# AI服装商品拍摄服务网站 - 后端

## 项目简介
本项目为AI服装商品拍摄服务网站的后端部分，提供用户、品牌、商品、任务、图片、模板等核心API，并对接AI服务（如豆包、绘蛙）。

## 技术栈
- Node.js (Express)
- MySQL
- RESTful API

## 启动方式
1. 安装依赖：`npm install`
2. 配置数据库连接
3. 启动服务：`npm start`

## 数据库初始化
1. 创建数据库：`CREATE DATABASE ai_photo_service;`
2. 导入建表SQL：
   ```
   mysql -u root -p ai_photo_service < config/db.sql
   ```
3. 配置数据库连接参数（可通过环境变量DB_HOST、DB_USER、DB_PASSWORD、DB_NAME设置）

## 目录结构
```
backend/
├── src/
│   ├── controllers/   # 控制器
│   ├── models/        # 数据库模型
│   ├── routes/        # 路由
│   ├── services/      # 业务逻辑
│   ├── middlewares/   # 中间件
│   └── app.js         # 入口文件
├── config/            # 配置文件
├── scripts/           # 脚本
├── package.json       # 依赖管理
└── README.md          # 项目说明
``` 

Local:   http://localhost:3000 