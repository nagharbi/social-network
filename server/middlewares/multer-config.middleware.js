const multer = require('multer');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const type = req.params.type ? req.params.type : req.body.type;
    const path = `./images/${type}`;
    console.log(path);
    fs.access(path, access => {
      return (access !== null) ? fs.mkdir(path, error => callback(error, path)) : callback(null, path);
    });
  },
  filename: (req, file, callback) => {
    if (!MIME_TYPES[file.mimetype]) {
      callback(new Error('Invalid MIME type'));
    }
    callback(null, `${Date.now()}.${MIME_TYPES[file.mimetype]}`);
  }
});

module.exports = multer({storage: storage}).single('image');
