const express = require('express');
const router = express.Router();
const path = require('path');
const rootdir = require('../util/path');
const categories = require('./../db/categorias.json');

const products = [];

router.get('/add-product', (req, res) => {
  // res.send(
  //   '<form action="/admin/product" method="POST"> <input type="text" name="title"/> <button>Add product</button></form>'
  // );
  //res.sendFile(path.join(rootdir, 'views', 'add-product.html'));
  res.render('add-product', {
    docTitle: 'Add new product',
    categories: categories.categorias,
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id === id);
  res.render('product', {
    docTitle: product.name,
    product,
  });
});

router.post('/product', (req, res) => {
  const product = req.body;
  product.id = 'id' + Math.random().toString(16).slice(2);

  products.push(product);
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
