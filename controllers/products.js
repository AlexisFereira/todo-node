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
      activeLink: 'shop',
    });
  });
}

function getProduct(req, res) {
  const id = req.params.id;
  Product.fetchById(id, product => {
    res.render('shop/product', {
      docTitle: product.title,
      product,
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount,
      activeLink: 'shop',
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
    res.status(200).send({msj: `${id} elimidado.`});
  });
}

function updateProduct(req, res) {
  const data = req.body;
  Product.updateProduct(data, () => {
    res.redirect('/');
  });
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
