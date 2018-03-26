export const AUTH_CONFIG = {
  domain: 'northview-playlister.auth0.com',
  clientId: 'GaqVd9yDK7ooXNtEryHLJ5PHnURJjGbC',
  callbackUrl: process.env.AUTH0_LOGIN_CALLBACK_URL || 'http://localhost:3000/callback',
  audience: 'playlister-api'
}
