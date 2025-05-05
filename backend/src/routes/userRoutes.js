const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/info', auth, userController.getUserInfo);

module.exports = router; 