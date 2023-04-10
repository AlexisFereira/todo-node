const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true,
  },
  date: {type: Date, require: true},
  text: {type: String, require: true},
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
