const formidable = require('formidable');

const UPLOAD_DIRECTORY = process.env.UPLOAD_DIRECTORY;

if (!UPLOAD_DIRECTORY) throw new Error('UPLOAD_DIRECTORY must be defined');


function formidableMiddleware(options) {
  return (req, res, next) => {
    const form = new formidable.IncomingForm(options)
    form.keepExtensions = true;
    form.uploadDir = UPLOAD_DIRECTORY;
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
