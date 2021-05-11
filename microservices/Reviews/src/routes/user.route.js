const { Router } = require('express');
const UserController = require('../manage-users/user.controller');
const UserMiddleware = require('../manage-users/user.middleware');

const router = new Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

router.post('/create', userMiddleware.validateCreateUser, userController.createUser);

router.put('/update/:userName', userMiddleware.validateUpdateUser, userController.updateUser);

router.put('/updatePassword/:userName', userMiddleware.validateUpdatePassword, userController.updatePassword);

// router.delete('/delete/:userName', userMiddleware.validateDeleteUser, userController.deleteUser);

module.exports = router;