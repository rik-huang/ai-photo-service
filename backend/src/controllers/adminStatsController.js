const pool = require('../models/db');

exports.getStats = async (req, res) => {
  try {
    const [[{ brandCount }]] = await pool.query('SELECT COUNT(*) AS brandCount FROM brands');
    const [[{ userCount }]] = await pool.query('SELECT COUNT(*) AS userCount FROM users');
    const [[{ taskCount }]] = await pool.query('SELECT COUNT(*) AS taskCount FROM tasks');
    const [[{ aiImageCount }]] = await pool.query("SELECT COUNT(*) AS aiImageCount FROM images WHERE type IN ('ai', 'ai_clothes')");
    res.json({ brandCount, userCount, taskCount, aiImageCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 