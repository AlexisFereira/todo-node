const Order = require('../models/order');
const Cart = require('../models/cart');

const ordersList = [];

function getOrders(req, res) {
  Order.getOrders(ordersList => {
    res.render('admin/orders', {
      activeLink: 'orders',
      docTitle: 'Orders - ' + ordersList.length,
      itemsInCart: req.itemsInCart,
      orderList: req.orderAmount,
      orders: ordersList,
    });
  });
}

function getOrder(req, res) {
  const id = req.params.id;
  Order.getOrder(id, order => {
    res.render('admin/order', {
      activeLink: 'orders',
      docTitle: 'Orders - ' + order.id,
      itemsInCart: req.itemsInCart,
      order,
      orderList: req.orderAmount,
    });
  });
}

function addOrder(req, res) {
  const {userId} = req;
  const dataBill = req.body;
  Cart.getCart(userId, cart => {
    const {articlesAmount, products, total} = cart;
    const order = new Order({
      dataBill,
      products,
      articlesAmount,
      total,
    });
    order.save(() => {
      Cart.reset(userId, () => {
        res.redirect('/orders');
      });
    });
  });
}
function updateOrder(req, res) {}
function removeOrder(req, res) {}

module.exports = {
  addOrder,
  getOrder,
  getOrders,
  ordersList,
  removeOrder,
  updateOrder,
};
