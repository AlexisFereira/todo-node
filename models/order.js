const mongoose = require('mongoose');
const {Schema} = mongoose;

const product = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Producto',
    required: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const dataBillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  paymentMethod: {
    type: String,
  },
});

const orderSchema = new Schema({
  date: {
    type: Date,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  products: {
    type: [product],
    require: true,
  },
  dataBill: {
    type: dataBillSchema,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

orderSchema.methods.updateState = function (state) {
  if (state) {
    this.state = state;
    return this.save();
  }
};

module.exports = mongoose.model('Order', orderSchema);
