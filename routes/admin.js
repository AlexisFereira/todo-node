const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const productCtrl = require('./../controllers/products');
const categories = require('./../db/categorias.json');

const products = [];

router.get('/add-product', (req, res) => {
  res.render('add-product', {
    docTitle: 'Add new product',
    categories: categories.categorias,
    itemsInCart: req.itemsInCart,
    orderList: req.orderAmount,
    editing: false,
  });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Product.fetchById(id, product => {
    res.render('add-product', {
      docTitle: 'Edit Product',
      categories: categories.categorias,
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount,
      editing: true,
      dataProduct: product,
    });
  });
});

router.get('/:id', productCtrl.getProduct);

router.post('/product', productCtrl.addProduct);

router.post('/editProduct', productCtrl.updateProduct);

router.delete('/deleteProduct/:id', productCtrl.deleteProduct);

exports.routes = router;
exports.products = products;
