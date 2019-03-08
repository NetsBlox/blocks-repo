const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const passport = require('passport');
const fs = require('fs');
const multer = require('multer');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/blocks';
const UPLOADS_DIR = process.env.UPLOADS_DIR || 'public/user-uploads';

// configure isProduction variable
const ENV = process.env.ENV || 'dev';
const isProduction = ENV === 'production';

// ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// models and routes
require('./models/Users');
require('./models/Uploads');

let app = express();

// configure the app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.set('debug', true);

// load in the routes
app.use(require('./routes'));

// error handlers & middlewares
if (!isProduction) {
  app.use(errorHandler());
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
