const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { getDbInstance } = require('./services/mysql');

module.exports.getApp = async function getApp() {
  const app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(require('./routes/content'));
  app.use(require('./routes/media'));

  // set the app sequelize instance onto the express global context
  app.set('db', await getDbInstance());

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    console.error('Could not find a route for request', req.path);
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;

    console.error('ERROR in Express', err);

    if (res.headersSent) {
      console.error(
        'HEY! YOU! Check this out! So the error handler in ExpressJS was triggered, ' +
        'but somehow the response has already been sent!! WTF MATE! I highly recommend ' +
        'you check out who is sending responses but also triggering errors'
      );
      return;
    }

    res.status(err.status || 500).send({ error: 'Unknown Error' });
  });

  return app;
};

