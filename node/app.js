const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const contentRoutes = require('./routes/content');
const mediaRoutes = require('./routes/media');

const { getDbInstance } = require('./services/mysql');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://northview-playlister.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  // audience: 'playlister-api',
  issuer: 'https://northview-playlister.auth0.com/',
  algorithms: ['RS256'],
});

module.exports.getApp = async function getApp() {
  const app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(checkJwt);
  app.use(contentRoutes);
  app.use(mediaRoutes);

  // set the app sequelize instance onto the express global context
  app.set('db', await getDbInstance());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.error('Could not find a route for request', req.path);
    next(err);
  });

  // error handler
  app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = err;

    console.error('ERROR in Express', err);

    if (res.headersSent) {
      console.error(
        'HEY! YOU! Check this out! So the error handler in ExpressJS was triggered, ' +
        'but somehow the response has already been sent!! WTF MATE! I highly recommend ' +
        'you check out who is sending responses but also triggering errors',
      );
      return;
    }

    res.status(err.status || 500).send({ error: 'Unknown Error' });
  });

  return app;
};

