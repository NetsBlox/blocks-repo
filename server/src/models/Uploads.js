const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  description: String,
  files: Array,
  tags: [String],
  compats: [String],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  authorId: String,
});

mongoose.model('Uploads', schema);
