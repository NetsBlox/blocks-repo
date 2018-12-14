const mongooseCrud = model => {
  const routes = [
    { // create
      url: '',
      parameters: '',
      method: 'post',
      note: 'create',
      // middleware: ['isLoggedIn'],
      handler: function(req, res) {
        const newEntry = req.body;
        return model.create(newEntry);
      }
    },

    { // read many
      url: '',
      method: 'get',
      // middleware: ['isLoggedIn'],
      handler: function(req, res) {
        let query = res.locals.query || {};
        return model.find(query);
      }
    },

    { // read one
      url: '',
      method: 'get',
      handler: function(req, res) {
        const { _id } = req.params;
        return model.findById(_id);
      }
    },

    { // update
      url: '',
      method: 'put', // FIXME patch?
      handler: function(req, res) {
        const changedEntry = req.body;
        return model.update({ _id: req.params._id }, { $set: changedEntry });
      }
    },

    { // read one
      url: '',
      method: 'delete',
      handler: function(req, res) {
        return model.remove({ _id: req.params._id });
      }
    }

  ]
    .map(r => {
      r.url = model.collection.name + '/' + r.url;
      return r;
    });
  return routes;
};

module.exports = mongooseCrud;
