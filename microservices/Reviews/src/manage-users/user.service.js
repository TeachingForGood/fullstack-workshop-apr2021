const DatabaseService = require('../database/database.service');

class UserService {
    INSERT_USER = `
        INSERT INTO teaching_for_good.users (user_name, first_name, last_name, email, password) 
        VALUES (?, ?, ?, ?, ?);
    `;

    UPDATE_USER = `
        UPDATE teaching_for_good.users set first_name = ?, last_name = ? , email = ? 
        WHERE USER_NAME = ?;
    `;

    CHANGE_PASSWORD_USER = `
        UPDATE teaching_for_good.users set PASSWORD = ? 
        WHERE USER_NAME = ?;
    `;

    SELECT_USER_BY_ID = `
        SELECT user_name, first_name, last_name, email, password
        from teaching_for_good.users u
        where u.user_name = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }
    
    async createUser({ userName, firstName, lastName, email, password }) {
        try {
            console.log(userName, firstName, lastName, email, password);
            // Insert into User
            const { insertId } = await this.databaseService.query(this.INSERT_USER, 
                [ userName, firstName, lastName, email, password ]);
      
            // Return just the insertId
            return insertId;
        } catch (error) {
            console.error('Error inserting user: ', error);
            throw error;
        }
    }

    async updateUser({ firstName, lastName, email }, userName) {
        try {
            const { updateId } = await this.databaseService.query(this.UPDATE_USER, 
                [ firstName, lastName, email, userName ]);
      
            return updateId;
        } catch (error) {
            console.error('Error updating user: ', error);
            throw error;
        }
    }

    async updatePassword(password , userName) {
        try {
            const { updateId } = await this.databaseService.query(this.CHANGE_PASSWORD_USER, 
                [ password, userName ]);
      
            return updateId;
        } catch (error) {
            console.error('Error updating password: ', error);
            throw error;
        }
    }

    async retrieveUserById(userName) {
        try {
            const result = await this.databaseService.query(this.SELECT_USER_BY_ID, [ userName ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = UserService;