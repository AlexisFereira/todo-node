const express = require('express');
const router = express.Router();
const path = require('path');
const rootdir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  res.render('shop', {
    docTitle: 'Wellcome to my shop',
    products: adminData.products,
  });
});

module.exports = router;
