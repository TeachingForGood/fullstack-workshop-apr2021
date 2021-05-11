const { Router } = require('express');
const ReviewController = require('../manage-reviews/review.controller');
const ReviewMiddleware = require('../manage-reviews/review.middleware');

const router = new Router();
const reviewController = new ReviewController();
const reviewMiddleware = new ReviewMiddleware();

router.post('/createUpdateReview', reviewMiddleware.validateMovieReview, reviewController.createUpdateMovieReview);

router.get('/search', reviewController.retrieveMovieReviews);


module.exports = router;