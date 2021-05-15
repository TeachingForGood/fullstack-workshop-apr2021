'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sandbox = require('sinon').createSandbox();
const ReviewController = require('../src/manage-reviews/review.controller');

describe('Review Controller Test', () => {
    beforeEach(() => {
        // sandbox.stub(authService, 'verifyToken');
    });

    it('should error out - No User Name', () => {
        const reviewController = new ReviewController();
        const req = {};
        const res = getResponseObject();
        reviewController.createUpdateMovieReview(req, res);
        console.log(res);
        expect(res.status).to.equal(500);
    });

    it('should error out - No Movie Id', async () => {
        const reviewController = new ReviewController();

        const req = {
            user: { userName: 'rpandian' }
        };
        const res = getResponseObject();

        await reviewController.createUpdateMovieReview(req, res);
        console.log(res);
        expect(res.status).to.equal(500);
        expect(res.json.message).to.equal(`Error creating/updating Movie Reviews`);
    });

    it('should error out - Sucess', async () => {
        const reviewController = new ReviewController();
        sandbox.stub(reviewController.reviewService, 'createUpdateMovieReview');
        reviewController.reviewService.createUpdateMovieReview.returns({ });

        const req = {
            body: { movieId: 3, rating: '4', comments: 'Good Movie' },
            user: { userName: 'rpandian' }
        };
        const res = getResponseObject();

        await reviewController.createUpdateMovieReview(req, res);
        console.log(res);
        expect(res.status).to.equal(200);
        expect(res.json.result).to.equal(`success`);
    });

    function getResponseObject() {
        return {
            status(code) {
                this.status = code;
                return this;
            },
            send(data) {
                this.send = data;
                return this;
            },
            json(data) {
                this.json = data;
                return this;
            },
            end() {
                return this;
            },
        };
    }
});