const DatabaseService = require('../database/database.service');

class MovieService {
    INSERT_CREATE = `
        INSERT INTO teaching_for_good.movies (name, category, release_date) VALUES (?, ?, ?);
    `;

    UPDATE_MOVIE = `
        UPDATE teaching_for_good.movies set name = ?, category = ? , release_date = ? where id = ?;
    `;

    DELETE_MOVIE = `
        DELETE FROM teaching_for_good.movies where id = ?;
    `;

    SELECT_CATEGORY_BY_CODE = `
        select * from teaching_for_good.movie_categories where code = ?
    `;
    SELECT_ALL_MOVIE = `
        SELECT m.id, m.name, m.category categoryCode, mc.description categoryDesc, m.release_date releaseDate
        from teaching_for_good.movies m
        inner join movie_categories mc on m.category = mc.code;
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

    async retrieveCategoryByCode(code) {
      try {
          // Insert into Products
          const result = await this.databaseService.query(this.SELECT_CATEGORY_BY_CODE, [ code ]);
          return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
  }

    async createMovie({ name, categoryCode, releaseDate }) {
        try {
            console.log(name, categoryCode, releaseDate);
            // Insert into Products
            const { insertId } = await this.databaseService.query(this.INSERT_CREATE, 
                [ name, categoryCode, releaseDate ]);
      
            // Return just the insertId
            return insertId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async updateMovie({ name, categoryCode, releaseDate }, movieId) {
        try {
            // Insert into Products
            const { updateId } = await this.databaseService.query(this.UPDATE_MOVIE, 
                [ name, categoryCode, releaseDate, movieId ]);
      
            return updateId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async deleteMovie(movieId) {
        try {
            // Insert into Products
            const { deleteId } = await this.databaseService.query(this.DELETE_MOVIE, 
                [ movieId ]);
      
            return deleteId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveAllMovies() {
        try {
            // Insert into Products
            const result = await this.databaseService.query(this.SELECT_ALL_MOVIE);
      
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveMovie({ name, category }) {
        try {
            // Insert into Products
            let query = this.SELECT_ALL_MOVIE + ` where 1=1`;
            let params = [];
            if (!!name) {
              query += ` and m.name like ?`;
              params.push(`%${name}%`);
            }

            if (!!category) {
              query += ` and mc.description = ?`;
              params.push(category);
            }
            
            const result = await this.databaseService.query(query, params);
      
            return result;
          } catch (error) {
            console.error(error);
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

module.exports = MovieService;
