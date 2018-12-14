const Upload = require('../storage/uploads');

const mongooseCrud = require('../storage/mongooseCrud');

const routes = mongooseCrud(Upload);

routes.forEach(r => {
  if (r.method !== 'get') {
    r.middleware = ['isAdmin'];
  }
});

module.exports = routes;
