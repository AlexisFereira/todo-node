const fs = require('fs');
const uuid = require('uuid').v4;
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'db',
  'carts.json'
);

class Cart {
  constructor() {
    this.carts = [];
  }

  static reset(userId, cb) {
    this.getCart(userId, cart => {
      cart.productsId = [];
      cart.products = [];
      cart.articlesAmount = 0;
      cart.total = 0;
      this.save(cart, cb);
    });
  }

  static calculateTotal(cart) {
    let total = 0;
    let articles = 0;
    cart.products.forEach(product => {
      total = parseInt(product.price) * product.quantity + total;
      articles = parseInt(articles) + product.quantity;
    });
    cart.total = total;
    cart.articlesAmount = articles;
    return cart;
  }

  static addProductToCart(data, products, cb) {
    const {userId, productId, quantity} = data;
    this.getCart(userId, cart => {
      const productAdded = cart.products.some(
        product => product.id === productId
      );
      if (productAdded) {
        cart.products = cart.products.map(product => {
          if (product.id === productId) {
            product.quantity = parseInt(product.quantity) + quantity;
            product.total = parseInt(product.price) * quantity;
          }
          return product;
        });
      } else {
        const product = products.find(
          itemProduct => itemProduct.id === productId
        );
        product.quantity = quantity;
        product.total = parseInt(product.price) * quantity;
        console.log(product.total);
        cart.products.push(product);
      }
      cart = this.calculateTotal(cart);
      this.save(cart, cb);
    });
  }

  static removeProductFromCart(userId, productId, cb) {
    this.getCart(userId, cart => {
      cart.products = cart.products.filter(product => product.id !== productId);
      cart = this.calculateTotal(cart);
      this.save(cart, cb);
    });
  }

  static updateCart(userId, id, type, cb = () => null) {
    this.getCart(userId, cart => {
      console.log({cart});
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
      this.save(this.calculateTotal(cart), () => {
        cb(cart);
      });
    });
  }

  purchase(req, res) {
    res.render('purchase', {
      cart: cart,
      docTitle: 'Purchase',
      itemsInCart: cart.products.length,
      orderList: req.orderAmount,
    });
  }

  static getCart(userId, cb) {
    const newCart = {
      id: uuid(),
      userId,
      products: [],
      articlesAmount: 0,
      total: 0,
    };

    fs.readFile(p, 'utf-8', (err, data) => {
      if (err || !data || !JSON.parse(data) || !JSON.parse(data).length) {
        return cb(newCart);
      }
      const carts = JSON.parse(data);
      const cart = carts.find(cartItem => cartItem.userId === userId);
      if (cart) return cb(cart);
      carts.push(newCart);
      fs.writeFile(p, JSON.stringify(carts), e => {
        if (e) console.log(e);
        return cb(newCart);
      });
      return;
    });
  }

  static save(cart, cb) {
    let carts = null;
    fs.readFile(p, 'utf-8', (e, file) => {
      if (e || !file || !JSON.parse(file)) {
        fs.writeFile(p, JSON.stringify([cart]), e => {
          if (e) console.log(e);
          cb(cart);
        });
        return;
      }
      const cartsList = JSON.parse(file);
      carts = cartsList.map(cartItem => {
        if (cartItem.userId === cart.userId) {
          return cart;
        }
        return cartItem;
      });
      fs.writeFile(p, JSON.stringify(carts), e => {
        if (e) console.log(e);
        cb(cart);
      });
    });
  }
}

module.exports = Cart;
