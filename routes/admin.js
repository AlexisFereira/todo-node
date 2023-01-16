const express = require('express');
const router = express.Router();
const path = require('path');
const rootdir = require('../util/path');

router.get('/add-product', (req, res) => {
  // res.send(
  //   '<form action="/admin/product" method="POST"> <input type="text" name="title"/> <button>Add product</button></form>'
  // );
  res.sendFile(path.join(rootdir, 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
