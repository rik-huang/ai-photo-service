const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const brandRoutes = require('./routes/brandRoutes');
const productRoutes = require('./routes/productRoutes');
const taskRoutes = require('./routes/taskRoutes');
const templateRoutes = require('./routes/templateRoutes');
const aiJobRoutes = require('./routes/aiJobRoutes');
const userAdminRoutes = require('./routes/userAdminRoutes');
const brandAdminRoutes = require('./routes/brandAdminRoutes');
const adminStatsRoutes = require('./routes/adminStatsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI服装商品拍摄服务网站后端运行中');
});

// TODO: 挂载路由
app.use('/api/user', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/ai_jobs', aiJobRoutes);
app.use('/api/users', userAdminRoutes);
app.use('/api/brands_admin', brandAdminRoutes);
app.use('/api/admin/stats', adminStatsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`后端服务已启动，端口：${PORT}`);
}); 