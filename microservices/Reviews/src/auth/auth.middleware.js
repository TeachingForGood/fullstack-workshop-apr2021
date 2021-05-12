const OAuth2Service = require('../oauth2/oauth2.service');

class AuthMiddleware {
    constructor() {
        this.oAuth2Service = new OAuth2Service();
    }

    validateAuthentication = async (req, res, next) =>  {
        const errorMessage = 'You are not authorized for this action';
        const jwt = req.headers.authorization;
        if(!!jwt) {
            try {
                const payload = await this.oAuth2Service.validateJWT(jwt);    
                req.user = payload.profile;
                console.log(payload);
                next();
            } catch (error) {
                console.error('JWT is invalid,', error);
                res.status(401).json({ message: errorMessage });
            }
        } else {
            console.error('JWT is empty');
            res.status(401).json({ message: errorMessage });
        }
    }
}

module.exports = AuthMiddleware;