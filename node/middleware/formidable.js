const formidable = require('formidable');

function formidableMiddleware(options) {
  return (req, res, next) => {
    const form = new formidable.IncomingForm(options)
    form.keepExtensions = true;
    form.once('error', console.error)
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log('Error trying to parse multipart form', err);
        return next(err);
      }

      req.files = files;
      next();
    })
  };
}

module.exports = formidableMiddleware;
