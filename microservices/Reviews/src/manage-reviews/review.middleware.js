const ReviewService = require('./review.service');
const UserService = require('../manage-users/user.service');

class ReviewMiddleware {
    constructor() {
        this.reviewService = new ReviewService();
        this.userService = new UserService();
    }

    validateMovieReview = async (req, res, next) =>  {
        const reviewDetails = req.body;
        let errorList = [];
        
        if (!reviewDetails.userName || reviewDetails.userName.trim() === '') {
            errorList.push('User name cannot be Empty');
        } else {
            const result = await this.userService.retrieveUserById(reviewDetails.userName);
            if (!result || result.length == 0) {
                errorList.push('User name does not exist');
            }
        }

        if (reviewDetails.movieId <= 0) {
            errorList.push('Movie Id has to be greater than zero');
        } else if (isNaN(reviewDetails.movieId)) {
            errorList.push('Movie Id has to be numeric');
        } else {
            const result = await this.reviewService.retrieveMovieById(reviewDetails.movieId);
            if (!result || result.length == 0) {
                errorList.push('Movie Id does not exist');
            }
        }

        if (isNaN(reviewDetails.rating)) {
            errorList.push('Rating has to be a numeric value')
        } else if (reviewDetails.rating < 1 || reviewDetails.rating > 5) {
            errorList.push('Rating has to be between 1 - 5')
        }

        if (errorList.length > 0) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }
}

module.exports = ReviewMiddleware;