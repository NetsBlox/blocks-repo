const express = require('express'),
  path = require('path'),
  multer = require('multer');

const PORT = process.env.PORT || 5000,
  UPLOADS_DIR = process.env.UPLOADS_DIR || 'dist/user-uploads/',
  ENV = process.env.ENV || 'dev';

const upload = multer({dest: UPLOADS_DIR});

let app = express();
app.use(express.static('dist'))

if (ENV !== 'production') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}


app.post('/upload', upload.array('modules', 12), function (req, res, next) {
  console.log(`received ${req.files.length} files`);
  let filesInfo = req.files.map(file => {
    delete file.fieldname;
    delete file.encoding;
    delete file.destination;
    file.path = file.path.substring('dist'.length);
    return file;
  });
  res.send(filesInfo);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});


let server = app.listen(PORT, () => {
  console.log('app listening on port ' + server.address().port);
});
