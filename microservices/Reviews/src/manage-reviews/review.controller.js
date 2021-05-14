const ReviewService = require('./review.service');

class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }

    retrieveMovieReviews = async (req, res) => {
        try {
            const reviewDetails = req.query;
            const result = await this.reviewService.retrieveMovieReview(reviewDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(200).json({ status: 'Failed', message: 'Error searching Reviews' });
        }
    }

    createUpdateMovieReview = async (req, res) => {
        try {
            const reviewDetails = req.body;
            const userName = req.user.userName;
            await this.reviewService.createUpdateMovieReview(userName, reviewDetails);
            return res.status(200).json({result: 'success'});
        } catch (error) {
            // console.error('Error in create/update movie review', error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating/updating Movie Reviews' });
        }
    } 
}

module.exports = ReviewController;