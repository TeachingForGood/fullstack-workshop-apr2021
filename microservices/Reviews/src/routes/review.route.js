const { Router } = require('express');
const ReviewController = require('../manage-reviews/review.controller');
const ReviewMiddleware = require('../manage-reviews/review.middleware');
const AuthMiddleware = require('../auth/auth.middleware');

const router = new Router();
const reviewController = new ReviewController();
const reviewMiddleware = new ReviewMiddleware();
const authMiddleware = new AuthMiddleware();

router.post('/createUpdateReview', authMiddleware.validateAuthentication, reviewMiddleware.validateMovieReview, reviewController.createUpdateMovieReview);

router.get('/search', reviewController.retrieveMovieReviews);


module.exports = router;