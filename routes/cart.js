const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart');

router.put('/cart/change-quantity', cartCtrl.updateCart);
router.get('/cart', cartCtrl.getCart);
router.post('/add-to-cart', cartCtrl.addProductToCart);
router.delete('/remove-product/:id', cartCtrl.removeProductFromCart);
router.get('/cart/purchase', cartCtrl.purchase);

module.exports = router;
