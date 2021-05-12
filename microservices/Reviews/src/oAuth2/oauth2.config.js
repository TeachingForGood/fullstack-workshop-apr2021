const fs = require('fs');
const path = require('path');
const privateKEY = fs.readFileSync(path.resolve(__dirname, './keys/private.pem'));
const publicKey = fs.readFileSync(path.resolve(__dirname, './keys/public.pem'));

// These are loaded into process.env from secrets manager
const config = {
  OAUTH2_ACCESS_TOKEN_DURATION: process.env.OAUTH2_ACCESS_TOKEN_DURATION || 900,
  OAUTH2_BASE_URL: process.env.OAUTH2_BASE_URL || 'http://localhost:5000/fullstack/idm/auth/oauth2',
  OAUTH2_ISSUER: process.env.OAUTH2_BASE_URL || 'http://localhost:5000/fullstack/idm/auth/oauth2',
  OAUTH2_AUDIENCE: process.env.OAUTH2_AUDIENCE || 'http://localhost:5000/fullstack/',
  JWT_SIG_PVT_KEY: process.env.JWT_SIG_PVT_KEY
    ? Buffer.from(process.env.JWT_SIG_PVT_KEY, 'base64').toString()
    : privateKEY,
  JWT_SIG_PUB_KEY: process.env.JWT_SIG_PUB_KEY
    ? Buffer.from(process.env.JWT_SIG_PUB_KEY, 'base64').toString()
    : publicKey,
  AllowedScopes: [],
  PublicAllowedScopes: []
};

config.JWTSignOptions = {
  issuer: config.OAUTH2_ISSUER,
  audience: config.OAUTH2_AUDIENCE,
  expiresIn: `${config.OAUTH2_ACCESS_TOKEN_DURATION}s`,
  algorithm: 'RS256'
};

module.exports = config;
