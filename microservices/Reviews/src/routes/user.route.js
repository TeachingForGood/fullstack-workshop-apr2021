const { Router } = require('express');
const UserController = require('../manage-users/user.controller');
const UserMiddleware = require('../manage-users/user.middleware');
const AuthController = require('../auth/auth.controller');

const router = new Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();
const authController = new AuthController();

router.post('/create', userMiddleware.validateCreateUser, userController.createUser);

router.put('/update/:userName', userMiddleware.validateUpdateUser, userController.updateUser);

router.put('/updatePassword/:userName', userMiddleware.validateUpdatePassword, userController.updatePassword);

router.post('/login', authController.login);

module.exports = router;