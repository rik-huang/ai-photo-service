const pool = require('../models/db');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, role, brand_id, created_at FROM users');
    res.json(rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, email, role, brand_id } = req.body;
    if (!username || !password || !email || !role) throw new Error('参数不完整');
    const [rows] = await pool.query('SELECT id FROM users WHERE username=? OR email=?', [username, email]);
    if (rows.length > 0) throw new Error('用户名或邮箱已存在');
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password_hash, email, role, brand_id) VALUES (?, ?, ?, ?, ?)', [username, hash, email, role, brand_id || null]);
    res.json({ message: '用户创建成功' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, role, brand_id, password } = req.body;
    const id = req.params.id;
    let sql = 'UPDATE users SET username=?, email=?, role=?, brand_id=?';
    let params = [username, email, role, brand_id || null];
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      sql += ', password_hash=?';
      params.push(hash);
    }
    sql += ' WHERE id=?';
    params.push(id);
    const [result] = await pool.query(sql, params);
    if (result.affectedRows === 0) throw new Error('用户不存在或未更新');
    res.json({ message: '用户已更新' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query('DELETE FROM users WHERE id=?', [id]);
    if (result.affectedRows === 0) throw new Error('用户不存在或未删除');
    res.json({ message: '用户已删除' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 