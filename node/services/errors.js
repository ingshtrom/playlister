const { ValidationError } = require('sequelize');

function handleError(msg, err) {
  if (err instanceof ValidationError) {
    console.error(msg, err, err.errors);
  } else {
    console.error(msg, err);
  }
}

module.exports.handleError = handleError;
