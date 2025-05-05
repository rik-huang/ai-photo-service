-- 用户表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('brand', 'admin', 'auditor') NOT NULL DEFAULT 'brand',
  brand_id BIGINT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 品牌表
CREATE TABLE brands (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 商品表
CREATE TABLE products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  brand_id BIGINT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 拍摄任务表
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT NOT NULL,
  brand_id BIGINT NOT NULL,
  status ENUM('pending', 'auditing', 'approved', 'rejected', 'ai_processing', 'ai_done', 'ai_clothes', 'finished') NOT NULL DEFAULT 'pending',
  remark TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 图片表
CREATE TABLE images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  task_id BIGINT NOT NULL,
  type ENUM('front', 'back', 'ai', 'ai_clothes') NOT NULL,
  url VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'selected') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id)
);

-- 模板表
CREATE TABLE templates (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  brand_id BIGINT NOT NULL,
  model_name VARCHAR(50) NOT NULL,
  fixed_text TEXT,
  portrait_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- AI任务队列表
CREATE TABLE ai_jobs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  task_id BIGINT NOT NULL,
  type ENUM('img2text', 'text2img', 'clothes_swap') NOT NULL,
  status ENUM('pending', 'processing', 'success', 'failed') NOT NULL DEFAULT 'pending',
  input TEXT,
  result TEXT,
  error_msg TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id)
); 