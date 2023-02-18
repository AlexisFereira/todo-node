const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders');

router.get('/orders', orderCtrl.getOrders);
router.get('/orders/:id', orderCtrl.getOrder);
router.post('/add-order', orderCtrl.addOrder);
router.delete('/order', orderCtrl.removeOrder);

module.exports = router;
