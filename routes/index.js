const express = require('express');
const router = express.Router();
const { authController } = require('../controller');
const {checkToeken} = require('../middleware/checkToken');
const {authentication} = require('../middleware/authication');
const {loginAuthication} = require('../middleware/loginAuthication');

router.get('/',authController.renderRegister);
router.post('/register',authentication,authController.registerUser);
router.post('/login',loginAuthication,authController.loginUser);
router.get('/auth-me',checkToeken,authController.authMe);
router.get('/sign-in',authController.renderLogin);
router.get('/profile', authController.renderProfile);
router.get('/logout',checkToeken,authController.logoutUser);

module.exports = router;
