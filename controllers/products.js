const Product = require('../models/product');
const uuid = require('uuid').v4;

function getProducts(req, res) {
  Product.fetchAll(products => {
    res.render('shop', {
      docTitle: 'Wellcome to my shop',
      products: products || [],
      canEdit: true,
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount || 0,
    });
  });
}

function getProduct(req, res) {
  const id = req.params.id;
  Product.fetchAll(products => {
    const product = products.filter(product => product.id === id)[0];
    res.render('product', {
      docTitle: product.title,
      product,
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount,
    });
  });
}
function addProduct(req, res) {
  const data = req.body;
  data.id = uuid();
  const product = new Product(data);
  product.save();
  res.redirect('/');
}

function deleteProduct(req, res) {
  const id = req.params.id;
  Product.deleteProduct(id, () => {
    res.render('shop', {
      docTitle: 'Home',
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount,
    });
  });
}

function updateProduct(req, res) {
  const data = req.body;
  Product.updateProduct(data, product => {
    console.log({product});
    res.render('product', {
      docTitle: product.name,
      product,
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount,
    });
  });
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
