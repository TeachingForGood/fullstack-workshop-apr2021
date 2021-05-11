const OAuth2Service = require('../oauth2/oauth2.service');
const UserService = require('../manage-users/user.service');
const e = require('express');

class AuthController {
    constructor() {
        this.oAuth2Service = new OAuth2Service();
        this.userService = new UserService();
    }

    login = async (req, res) => {
        try {
            const { userName, password } = req.body;
            const result = await this.userService.retrieveUserById(userName);

            if(result && result.length === 1) {
                const userDetails = result[0];
                const isPasswordMatch = await this.userService.comparePassword(password, userDetails.password);

                if (isPasswordMatch) {
                    const jwt = await this.oAuth2Service.generateJWT({
                        profile: {
                            userName: userName,
                            lastName: userDetails.lastName,
                            firstName: userDetails.firstName,
                            email: userDetails.email
                        }
                    });

                    return res
                    .status(200)
                    .json({jwt: jwt})
                    .end();
                } else {
                    console.log(`Password mismatch for user ${userName}`);
                    return res
                    .status(401)
                    .json({message: 'Login Failed'})
                    .end();
                }
            } else {
                console.log(`User not found for user ${userName}`);
                return res
                .status(401)
                .json({message: 'Login Failed'})
                .end();
            }
        } catch (error) {
            console.error('Error Logging in, ', error);
            return res
            .status(401)
            .json({message: 'Login Failed'})
            .end();
        }
    }
}

module.exports = AuthController;