'use strict';
const logger = require('../logger').fork('middleware');

// route middlewares

function isAdmin(req, res, next) {
  res.status(403).send('not authorized');
}

module.exports = {
  isAdmin,
};
