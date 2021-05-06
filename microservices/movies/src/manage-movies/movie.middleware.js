const LocalDate = require("@js-joda/core").LocalDate;
const MovieService = require('./movie.service');

class MovieMiddleware {
    constructor() {
        this.movieService = new MovieService();
    }

    validateCreate= async (req, res, next) =>  {
        const movieDetails = req.body;
        let errorList = [];
        
        if (!movieDetails.name || movieDetails.name.trim() === '') {
            errorList.push('Movie name cannot be Empty')
        }

        if (!!movieDetails && movieDetails.name.trim().length > 200) {
            errorList.push('Movie names length cannot be greater than 200')
        }

        if (!movieDetails.categoryCode || movieDetails.categoryCode.trim() === '') {
            errorList.push('Movie category cannot be Empty')
        } else {
            const result = await this.movieService.retrieveCategoryByCode(movieDetails.categoryCode);
            if (result && result.length === 0) {
                errorList.push('Movie category is invalid')
            }
        }

        if (!!movieDetails.releaseDate) {
            try {
                LocalDate.parse(movieDetails.releaseDate);    
            } catch (error) {
                console.log(error);
                errorList.push('Error parsing Release Date')
            }
        }

        if (errorList.length > 0) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateUpdate= async (req, res, next) =>  {
        const movieDetails = req.body;
        let errorList = [];
        let isError = false;
        
        const result = await this.movieService.retrieveMovieById(req.params.movieId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Movie id is invalid')
        }

        const commonErrors = await this.validateMovieData(movieDetails);
        errorList = errorList.concat(commonErrors); 

        if (errorList.length > 0) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    async validateMovieData(movieDetails) {
        let errorList = [];
        
        if (!movieDetails.name || movieDetails.name.trim() === '') {
            errorList.push('Movie name cannot be Empty')
        }

        if (!!movieDetails && movieDetails.name.trim().length > 200) {
            errorList.push('Movie names length cannot be greater than 200')
        }

        if (!movieDetails.categoryCode || movieDetails.categoryCode.trim() === '') {
            errorList.push('Movie category cannot be Empty')
        } else {
            const result = await this.movieService.retrieveCategoryByCode(movieDetails.categoryCode);
            if (result && result.length === 0) {
                errorList.push('Movie category is invalid')
            }
        }

        if (!!movieDetails.releaseDate) {
            try {
                LocalDate.parse(movieDetails.releaseDate);    
            } catch (error) {
                console.log(error);
                errorList.push('Error parsing Release Date')
            }
        }

        return errorList;
    }

    validateDelete= async (req, res, next) =>  {
        let errorList = [];
        let isError = false;
        
        const result = await this.movieService.retrieveMovieById(req.params.movieId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Movie id is invalid')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }
}

module.exports = MovieMiddleware;