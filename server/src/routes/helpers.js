
// helper for creating basic crud routes for mongoose models
const mongooseCrud = model => {
  const routes = [
    { // create
      url: '/',
      method: 'post',
      handler: function(req, res) {
        const newEntry = req.body;
        return model.create(newEntry);
      }
    },

    { // read many
      url: '/',
      method: 'get',
      handler: function(req, res) {
        let query = res.locals.query || {};
        return model.find(query);
      }
    },

    { // read one
      url: '/:_id',
      method: 'get',
      handler: function(req, res) {
        const { _id } = req.params;
        return model.findById(_id);
      }
    },

    { // update
      url: '/:_id',
      method: 'put', // FIXME patch?
      handler: function(req, res) {
        const changedEntry = req.body;
        return model.update({ _id: req.params._id }, { $set: changedEntry });
      }
    },

    { // read one
      url: '/:_id',
      method: 'delete',
      handler: function(req, res) {
        return model.remove({ _id: req.params._id });
      }
    }

  ]
    .map(r => {
      return r;
    });
  return routes;
};


const promiseHanlder = route => { // handle the actual sending of the results
  let handler = route.handler;
  route.handler = async (req, res, next) => {

    if (route.customMiddleware) {
      for (let mw of route.customMiddleware) {
        await mw(req, res, next);
      }
    }

    let rv = handler(req, res, next);
    if (!rv.then) {
      res.status(200).send(rv);
    } else {
      rv.then(val => {
        if (typeof val === 'object') {
          res.status(200).json(val);
        } else {
          res.status(200).send(val);
        }
      }).catch(e => {
        logger.error(e);
        // WARN could potentially leak information
        res.status(500).send(e.message);
      });
    }
  };
  return route;
};


module.exports = {
  mongooseCrud,
  promiseHanlder,
};
