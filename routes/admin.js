const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const productCtrl = require('./../controllers/products');
const categories = require('./../db/categorias.json');

const products = [];

router.delete('/deleteProduct/:id', productCtrl.deleteProduct);

router.get('/add-product', (req, res) => {
  res.render('admin/add-product', {
    activeLink: 'add-product',
    categories: categories.categorias,
    docTitle: 'Add new product',
    editing: false,
    itemsInCart: req.itemsInCart,
    orderList: req.orderAmount,
  });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Product.fetchById(id, product => {
    res.render('admin/add-product', {
      activeLink: 'add-product',
      categories: categories.categorias,
      dataProduct: product,
      docTitle: 'Edit Product',
      editing: true,
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount,
    });
  });
});

router.get('/:id', productCtrl.getProduct);

router.post('/product', productCtrl.addProduct);

router.post('/editProduct', productCtrl.updateProduct);

exports.routes = router;
exports.products = products;
