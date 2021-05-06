const MovieService = require('./movie.service');

class MovieController {
    constructor() {
        this.movieService = new MovieService();
    }

    createMovie= async (req, res) => {
        try {
            const movieDetails = req.body;
            const movieData = await this.movieService.createMovie(movieDetails);
            return res.json({movieId: movieData});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating Movies' });
        }
    } 

    updateMovie= async (req, res) => {
        try {
            const movieId = req.params.movieId
            const movieDetails = req.body;
            await this.movieService.updateMovie(movieDetails, movieId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating Products' });
        }
    } 

    deleteMovie= async (req, res) => {
        try {
            const movieId = req.params.movieId
            await this.movieService.deleteMovie(movieId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating Products' });
        }
    } 

    retrieveAllMovies= async (req, res) => {
        try {
            const result = await this.movieService.retrieveAllMovies();
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieve all Movies' });
        }
    } 

    retrieveMovie= async (req, res) => {
        try {
            const movieDetails = req.query;
            const result = await this.movieService.retrieveMovie(movieDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error searching Movies' });
        }
    } 

    retrieveMovieById = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.movieService.retrieveMovieById(id);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieve movie by id' });
        }
    } 
}

module.exports = MovieController;