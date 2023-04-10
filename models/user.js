const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  name: {type: String, require: true},
  lastname: {type: String, require: true},
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Producto',
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  validated: {
    type: Boolean,
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductindex = this.cart.items.findIndex(
    productCart => productCart.productId.toString() === product.productId
  );
  let newQuantity = parseInt(product.quantity);
  const updatedCartItems = [...this.cart.items];

  if (cartProductindex >= 0) {
    newQuantity = this.cart.items[cartProductindex].quantity + newQuantity;
    updatedCartItems[cartProductindex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product.productId,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (id) {
  const updatedCartItems = [...this.cart.items];

  const updatedCart = {
    items: updatedCartItems.filter(
      productInCart => productInCart.productId.toString() !== id
    ),
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.updateItemInCart = function (id, decrease) {
  const cartProductindex = this.cart.items.findIndex(
    productCart => productCart.productId.toString() === id
  );
  let newQuantity = 0;
  const updatedCartItems = [...this.cart.items];
  if (cartProductindex >= 0) {
    newQuantity = decrease
      ? this.cart.items[cartProductindex].quantity - 1
      : this.cart.items[cartProductindex].quantity + 1;
    updatedCartItems[cartProductindex].quantity = newQuantity;
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.resetCart = function () {
  this.cart = {items: []};
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
