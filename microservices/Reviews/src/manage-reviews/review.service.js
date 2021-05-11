const DatabaseService = require('../database/database.service');

class ReviewService {
    INSERT_MOVIE_REVIEW = `
        INSERT INTO teaching_for_good.movie_user_reviews (user_name, movie_id, rating, comments) 
        VALUES (?, ?, ?, ? );
    `;

    UPDATE_MOVIE_REVIEW = `
        UPDATE teaching_for_good.movie_user_reviews set rating = ?, comments = ?
        WHERE user_name = ? and movie_id = ?;
    `;

    SELECT_MOVIE_REVIEW = `
        SELECT id, user_name, movie_id, rating, comments
        FROM teaching_for_good.movie_user_reviews
        WHERE 1=1
    `;

    SELECT_MOVIE_BY_ID = `
        SELECT m.id, m.name, m.category categoryCode, mc.description categoryDesc, m.release_date releaseDate
        from teaching_for_good.movies m
        inner join movie_categories mc on m.category = mc.code
        where m.id = ?;
    `;
    
    constructor() {
        this.databaseService = new DatabaseService();
    }
    
    async retrieveMovieReview({ userName, movieId }) {
        try {
            // Insert into Products
            let query = this.SELECT_MOVIE_REVIEW;
            let params = [];
            if (!!userName) {
              query += ` and user_name = ?`;
              params.push(userName);
            }

            if (!!movieId && movieId > 0) {
              query += ` and movie_id = ?`;
              params.push(movieId);
            }
            
            const result = await this.databaseService.query(query, params);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async createUpdateMovieReview({ userName, movieId, rating, comments }) {
        try {
            console.log(userName, movieId, rating, comments);
            // Insert into User
            const movieReviewResult = await this.retrieveMovieReview({ userName, movieId });
            
            if(movieReviewResult && movieReviewResult.length > 0) {
                await this.databaseService.query(this.UPDATE_MOVIE_REVIEW, 
                    [ rating, comments, userName, movieId ]);
            } else {
                await this.databaseService.query(this.INSERT_MOVIE_REVIEW, 
                    [ userName, movieId, rating, comments ]);
            }
        } catch (error) {
            console.error('Error create/update movie reviews: ', error);
            throw error;
        }
    }

    async retrieveMovieById(id) {
        try {
            // Insert into Products
            const result = await this.databaseService.query(this.SELECT_MOVIE_BY_ID, [ id ]);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = ReviewService;