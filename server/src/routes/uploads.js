const Upload = require('../storage/uploads');

const mongooseCrud = require('../storage/mongooseCrud');

module.exports = mongooseCrud(Upload);
