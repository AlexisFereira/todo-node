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
  res.render('cart', {
    docTitle: cart.products.length ? `Cart(${cart.products.length})` : 'Cart',
    cart,
    itemsInCart: cart.products.length,
    orderList: req.orderAmount,
  });
}

function addProductToCart(req, res) {
  const {productId, quantity} = req.body;

  if (!productId || !quantity) {
    res.status(500).json({msj: 'datos incorrectos'});
    return;
  }

  const exist = cart.products.some(product => product.id === productId);
  if (exist) {
    cart.products = cart.products.map(product => {
      if (product.id === productId) {
        product.quantity = parseInt(product.quantity) + parseInt(quantity);
        product.total = parseInt(product.price) * parseInt(product.quantity);
      }
      return product;
    });
  } else {
    Product.fetchAll(productsList => {
      const product = productsList.find(
        itemProduct => itemProduct.id === productId
      );
      product.quantity = quantity;
      product.total = parseInt(product.price) * parseInt(quantity);
      cart.products.push(product);
      calculateTotal();
      res.redirect('/cart');
    });
  }
}

function removeProductFromCart(req, res) {
  const id = req.params.id;
  cart.products = cart.products.filter(product => product.id !== id);
  cart.productsId = cart.productsId.filter(product => product.productId !== id);
  calculateTotal();
  res.status(200).send({removed: true});
}

function updateCart(req, res) {
  const {type, id} = req.body;
  cart.products = cart.products.map(product => {
    if (product.id === id) {
      if (type === 'increase') {
        product.quantity = parseInt(product.quantity) + 1;
      } else {
        product.quantity = parseInt(product.quantity) - 1;
      }
      product.total = parseInt(product.price) * parseInt(product.quantity);
    }
    return product;
  });
  calculateTotal();
  res.status(200).json({data: cart});
}

function purchase(req, res) {
  res.render('purchase', {
    docTitle: 'Purchase',
    cart,
    itemsInCart: cart.products.length,
    orderList: req.orderAmount,
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
