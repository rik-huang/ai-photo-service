const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async ({ username, password, email, brand_id }) => {
  if (!username || !password || !email) throw new Error('参数不完整');
  const [rows] = await pool.query('SELECT id FROM users WHERE username=? OR email=?', [username, email]);
  if (rows.length > 0) throw new Error('用户名或邮箱已存在');
  const hash = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password_hash, email, brand_id) VALUES (?, ?, ?, ?)', [username, hash, email, brand_id || null]);
  return { message: '注册成功' };
};

exports.login = async ({ username, password }) => {
  if (!username || !password) throw new Error('参数不完整');
  const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username]);
  if (rows.length === 0) throw new Error('用户不存在');
  const user = rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error('密码错误');
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role, brand_id: user.brand_id }, JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user.id, username: user.username, role: user.role, brand_id: user.brand_id } };
};

exports.getUserInfo = async (userId) => {
  const [rows] = await pool.query('SELECT id, username, email, role, brand_id, created_at FROM users WHERE id=?', [userId]);
  if (rows.length === 0) throw new Error('用户不存在');
  return rows[0];
}; 