const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders');

router.delete('/order', orderCtrl.removeOrder);
router.get('/orders', orderCtrl.getOrders);
router.get('/orders/:id', orderCtrl.getOrder);
router.post('/add-order', orderCtrl.addOrder);

module.exports = router;
