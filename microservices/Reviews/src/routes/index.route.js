const { Router } = require('express');
const router = new Router();
const userRoutes = require('./user.route');

router.use('/user', userRoutes);

module.exports = router;