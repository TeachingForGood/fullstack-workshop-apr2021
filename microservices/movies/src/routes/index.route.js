const { Router } = require('express');
const router = new Router();
const moviesRoutes = require('./movies.route');

router.use('/movie', moviesRoutes);

module.exports = router;