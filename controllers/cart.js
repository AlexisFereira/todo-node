const Cart = require('../models/cart');
const Product = require('../models/product');

const cart = {
  productsId: [],
  products: [],
  articlesAmount: 0,
  total: 0,
};

const reset = () => {
  cart.productsId = [];
  cart.products = [];
  cart.articlesAmount = 0;
  cart.total = 0;
};

function calculateTotal() {
  let total = 0;
  let articles = 0;
  cart.products.forEach(product => {
    total = total + parseInt(product.price) * parseInt(product.quantity);
    articles = parseInt(articles) + parseInt(product.quantity);
  });
  cart.total = total;
  cart.articlesAmount = articles;
}

function getCart(req, res) {
  const userId = req.userId;
  Cart.getCart(userId, cart => {
    res.render('shop/cart', {
      docTitle: cart.products.length ? `Cart(${cart.products.length})` : 'Cart',
      cart,
      itemsInCart: cart.products.length,
      orderList: req.orderAmount,
      activeLink: 'cart',
    });
  });
}

function addProductToCart(req, res) {
  const {productId, quantity} = req.body;
  const {userId} = req;
  const data = {userId, productId, quantity: parseInt(quantity)};
  Product.fetchAll(products => {
    Cart.addProductToCart(data, products, () => {
      res.redirect('/cart');
    });
  });
}

function removeProductFromCart(req, res) {
  const id = req.params.id;
  Cart.removeProductFromCart(req.userId, id, () => {
    res.status(200).send({removed: true});
  });
}

function updateCart(req, res) {
  const {type, id} = req.body;
  const {userId} = req;
  Cart.updateCart(userId, id, type, cart => {
    res.status(200).json({data: cart});
  });
}

function purchase(req, res) {
  const cartId = req.params.id;
  res.render('shop/purchase', {
    docTitle: 'Purchase',
    itemsInCart: 0,
    orderList: req.orderAmount,
    activeLink: 'cart',
    cartId,
  });
}

module.exports = {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  purchase,
  cart,
  reset,
};
