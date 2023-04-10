const mongoose = require('mongoose');
const {Schema} = mongoose;

const productIncart = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  products: [productIncart],
  articlesAmount: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);
