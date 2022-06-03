const multer = require('multer');
const path = require('path');

const { failed } = require('../utils/response');

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === '.jpg' || ext === '.png' || ext === '.JPG' || ext === '.PNG') {
      cb(null, true);
    } else {
      const error = {
        message: 'File must be jpg or png!',
      };
      cb(error, false);
    }
  },
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 2,
  },
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('photo');
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, {
        code: 400,
        payload: err.message,
        message: 'bad request!',
      });
    } else {
      next();
    }
  });
};

module.exports = upload;
