const express = require('express');
const path = require('path');
const fs = require('fs');
const router = require('./routes');
const multer = require('multer');
const PORT = process.env.PORT || 5000;
const UPLOADS_DIR = process.env.UPLOADS_DIR || 'dist/user-uploads';
const ENV = process.env.ENV || 'dev';

let app = express();

// ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

app.use(express.static('dist'));

// load in the routes
app.use('/api', router);

if (ENV !== 'production') {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    let origName = file.originalname.replace(ext, '');
    let time = new Date().getTime();
    cb(null, `${origName}-${time}${ext}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('modules', 12), function(req, res, next) {
  console.log(`received ${req.files.length} files`);
  let filesInfo = req.files.map(file => {
    delete file.fieldname;
    delete file.encoding;
    delete file.destination;
    file.path = file.path.substring('dist'.length);
    return file;
  });
  res.send(filesInfo);
});

app.get('*', (req, res) => {
  res.status(404).send('Not found!');
  // res.sendFile(path.join(__dirname, '/dist/index.html'));
});

let server = app.listen(PORT, () => {
  console.log('app listening on port ' + server.address().port);
});
