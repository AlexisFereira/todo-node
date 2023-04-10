const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
