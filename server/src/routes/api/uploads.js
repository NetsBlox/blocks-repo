const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');

const Uploads = mongoose.model('Uploads');

const { mongooseCrud, promiseHanlder } = require('../helpers');

// list of route objects each: url, method, handler
let crudRoutes = mongooseCrud(Uploads);

crudRoutes = crudRoutes.map(promiseHanlder);

crudRoutes.forEach(r => {
  if (r.method !== 'get') {
    router[r.method](r.url, auth.required, r.handler);
  } else {
    router[r.method](r.url, auth.optional, r.handler);
  }
});

module.exports = router;
