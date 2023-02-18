const {cart,reset} = require('./cart');
const uuid = require('uuid').v4;

const ordersList = [];

function getOrders(req, res) {
  res.render('orders', {
    docTitle: 'Orders - ' + ordersList.length,
    orders: ordersList,
    itemsInCart: req.itemsInCart,
    orderList: req.orderAmount,
  });
}

function getOrder(req, res) {
  const id = req.params.id;
  const orderData = ordersList.find(orderItem => orderItem.id === id);
  res.render('order', {
    docTitle: 'Orders - ' + orderData.id,
    order: orderData,
    itemsInCart: req.itemsInCart,
    orderList: req.orderAmount,
  });
}

function addOrder(req, res) {
  const order = req.body;
  order.id = uuid();
  order.total = cart.total;
  order.articlesAmount = cart.articlesAmount;
  order.products = cart.products;
  order.state = 'pendiente';
  order.date = Date.now();
  ordersList.push(order);
  reset();
  res.redirect('/orders');
}
function updateOrder(req, res) {}
function removeOrder(req, res) {}

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  removeOrder,
  ordersList,
};
