const admin = require('firebase-admin'),
  serviceAccount = require('./serviceAccountKey.json'),
  fse = require('fs-extra');

const UPLOADS_DIR = process.env.UPLOADS_DIR;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://module-repo.firebaseio.com'
});

// TODO find stale files and remove/archive them

const db = admin.database();

// saved files
let fileNames = fse.readdirSync(UPLOADS_DIR);

// used and relevant files
let usersRef = db.ref('modules');

usersRef.once('value', data => {
  console.log(data.val());
});

// // find unused filenames
// let unusedFiles = fileNames.filter(f => !usedFiles.includes(f));

// // remove unusedfiles
// unusedFiles = unusedFiles.map(UPLOADS_DIR + '/' + fName);
// removeFiles(unusedFiles);

// function removeFiles(paths) {
//   let promises = paths.map(path => fse.remove(path));
//   Promise.all(promises)
//     .then(console.log)
//     .catch(console.error);
// }
