const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/blocks';

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const schema = new Schema({
  name: { type: String, required: true },
  description: String,
  files: Array,
  tags: [String],
  compats: [String],
  updatedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  author: Schema.Types.ObjectId
});

const Upload = mongoose.model('Upload', schema);

module.exports = Upload;
