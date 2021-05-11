const { Router } = require('express');
const router = new Router();
const userRoutes = require('./user.route');
const reviewRoutes = require('./review.route');

router.use('/user', userRoutes);
router.use('/review', reviewRoutes);

module.exports = router;