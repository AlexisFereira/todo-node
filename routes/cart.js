const express = require('express');
const router = express.Router();
const path = require('path');
const rootdir = require('../util/path');

router.get('/cart', (req, res) => {
  //res.sendFile(path.join(rootdir, 'views', 'cart.html'));
  res.render('cart', {docTitle: 'Cart'});
});

module.exports = router;
