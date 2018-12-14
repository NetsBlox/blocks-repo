// express routes
const router = require('express').Router();

const fs = require('fs');

const path = require('path');

const logger = require('../logger').fork('router');

// Load the routes from routes/
const routes = fs.readdirSync(path.join(__dirname, './'))
  .filter(name => path.extname(name) === '.js') // Only read js files
  .filter(name => name !== 'middleware.js') // ignore middleware file
  .filter(name => name !== 'index.js') // ignore index file
  .map(name => path.join(__dirname, '/', name)) // Create the file path
  .map(filePath => {
    logger.trace('about to load ' + filePath);
    return require(filePath);
  }) // Load the routes
  .reduce((prev, next) => prev.concat(next), []); // Merge all routes

// middleware.init(this);

routes.forEach(api => {
  const method = api.method.toLowerCase();
  api.url = '/' + api.url;
  logger.log(`adding "${method}" to ${api.url}`);

  const validResponse = function(res, val) {
    logger.trace(`responding with: ${val}`);
    res.status(200).send(val);
  };

  const errorResponse = function(res, err) {
    logger.error(`error occurred in ${api.url}:`, err);
    res.status(500).send(err.message);
  };

  // Add the middleware
  // if (api.middleware) {
  //   let args = api.middleware.map(name => middleware[name]);
  //   args.unshift(api.url);
  //   router.use.apply(router, args);
  // }

  router.route(api.url)[method]((req, res, next) => {
    logger.trace(`got a ${method} request for ${api.url}`);

    try { // expecting errors will/should throw
      const result = api.handler.call(this, req, res);

      if (result === undefined) { // did not return a val
        // meaning it would handle it on its own
        // res.send('ok');
      } else if (!result.then) { // returned a simple value
        validResponse(res, result);
      } else if (result.then) { // returned a promise
        result
          .then(resValue => {
            validResponse(res, resValue);
          })
          .catch(err => {
            errorResponse(res, err);
          });
      }
    } catch (err) {
      errorResponse(res, err);
    }
  });
});

module.exports = router;
