const { Router } = require('express');
const MovieController = require('../manage-movies/movie.controller');
const MovieMiddleware = require('../manage-movies/movie.middleware');

const router = new Router();
const movieController = new MovieController();
const movieMiddleware = new MovieMiddleware();

router.get('/all', movieController.retrieveAllMovies);

router.get('/search', movieController.retrieveMovie);

router.get('/:id', movieController.retrieveMovieById);

router.post('/create', movieMiddleware.validateCreate, movieController.createMovie);

router.put('/update/:movieId', movieMiddleware.validateUpdate, movieController.updateMovie);

router.delete('/delete/:movieId', movieMiddleware.validateDelete, movieController.deleteMovie);

module.exports = router;