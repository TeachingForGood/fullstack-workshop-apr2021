const jwt = require('jsonwebtoken');
const OAuthConfig = require('./oauth2.config');

class OAuth2Service {
  constructor() {}

  generateJWT = async (payload) => {
    const JwtKeyName = `JWT_SIG_PVT_KEY`;

    try {
      const accessToken = jwt.sign(payload, OAuthConfig[JwtKeyName], OAuthConfig.JWTSignOptions);

      return {
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: OAuthConfig.OAUTH2_ACCESS_TOKEN_DURATION,
        scope: payload.scopes || 'all',
      };
    } catch (err) {
      throw err;
    }
  };

  validateJWT = async (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        jwt.verify(token, OAuthConfig.JWT_SIG_PUB_KEY, OAuthConfig.JWTSignOptions, (err, payload) => {
          if (err) {
            reject(err);
          } else {
            resolve(payload);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };
}

module.exports = OAuth2Service;
