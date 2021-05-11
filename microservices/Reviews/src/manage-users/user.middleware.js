const UserService = require('./user.service');

class UserMiddleware {
    constructor() {
        this.userService = new UserService();
    }

    validateCreateUser = async (req, res, next) =>  {
        const userDetails = req.body;
        let errorList = [];
        
        if (!userDetails.userName || userDetails.userName.trim() === '') {
            errorList.push('User name cannot be Empty')
        } else if (!!userDetails && userDetails.userName.trim().length > 50) {
            errorList.push('User name length cannot be greater than 200')
        } else { 
            const result = await this.userService.retrieveUserById(userDetails.userName);
            if (result && result.length > 0) {
                errorList.push('User name has to be unique')
            }
        }

        const commonErrors = await this.validateUserData(userDetails);
        errorList = errorList.concat(commonErrors); 

        if (!userDetails.password || userDetails.password.trim() === '') {
            errorList.push('Password cannot be Empty')
        } else if (!!userDetails && userDetails.password.trim().length > 100) {
            errorList.push('Password length cannot be greater than 100')
        }

        if (errorList.length > 0) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateUpdateUser = async (req, res, next) =>  {
        const userDetails = req.body;
        let errorList = [];
        
        const result = await this.userService.retrieveUserById(req.params.userName);
        if (result && result.length === 0) {
            errorList.push('User name is invalid')
        }

        const commonErrors = await this.validateUserData(userDetails);
        errorList = errorList.concat(commonErrors); 

        if (errorList.length > 0) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    async validateUserData(userDetails) {
        let errorList = [];
        
        if (!userDetails.firstName || userDetails.firstName.trim() === '') {
            errorList.push('First name cannot be Empty')
        } else if (!!userDetails && userDetails.firstName.trim().length > 45) {
            errorList.push('First name length cannot be greater than 45')
        }

        if (!userDetails.lastName || userDetails.lastName.trim() === '') {
            errorList.push('Last name cannot be Empty')
        } else if (!!userDetails && userDetails.lastName.trim().length > 45) {
            errorList.push('Last name length cannot be greater than 200')
        }

        if (!userDetails.email || userDetails.email.trim() === '') {
            errorList.push('Email cannot be Empty')
        } else if (!!userDetails && userDetails.email.trim().length > 100) {
            errorList.push('Email length cannot be greater than 100')
        }

        return errorList;
    }

    validateUpdatePassword = async (req, res, next) =>  {
        const userDetails = req.body;
        let errorList = [];
        
        const result = await this.userService.retrieveUserById(req.params.userName);
        if (result && result.length === 0) {
            errorList.push('User name is invalid')
        }

        if (!userDetails.password || userDetails.password.trim() === '') {
            errorList.push('Password cannot be Empty')
        } else if (!!userDetails && userDetails.password.trim().length > 100) {
            errorList.push('Password length cannot be greater than 100')
        }

        if (errorList.length > 0) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }
}

module.exports = UserMiddleware;