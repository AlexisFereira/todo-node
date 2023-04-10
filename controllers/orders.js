const Order = require('../models/order');
const moment = require('moment');

const ordersList = [];

async function getOrders(req, res) {
  await Order.find({})
    .populate('products.productId')
    .then(orders => {
      orders = orders.map(order => ({
        total: order.products.reduce(
          (acum, current) => acum + current.quantity * current.productId.price,
          0
        ),
        id: order._id.toString(),
        dataBill: order.dataBill,
        products: order.products,
        date: moment(order.date).format('DD/MM/YYYY'),
        state: order.state,
      }));
      res.render('admin/orders', {
        activeLink: 'orders',
        docTitle: 'Orders - ' + ordersList.length,
        itemsInCart: req.user.cart.items.length,
        orderList: req.orderAmount,
        orders,
        isLoggedIn: req.session.isLoggedIn,
      });
    });
}

async function getOrder(req, res) {
  const id = req.params.id;
  await Order.findById(id)
    .populate('products.productId')
    .then(order => {
      order.products = [...order.products].map(product => {
        product.total = product.quantity * product.productId.price;
        product.title = product.productId.title;
        product.price = product.productId.price;
        delete product.productId.title;
        delete product.productId.price;
        return product;
      });
      res.render('admin/order', {
        activeLink: 'orders',
        docTitle: 'Orders - ' + order.id,
        itemsInCart: req.itemsInCart,
        order,
        orderList: req.orderAmount,
        isLoggedIn: req.session.isLoggedIn,
      });
    });
}

async function addOrder(req, res) {
  const {body} = req;
  const order = new Order({
    userId: req.user._id,
    products: req.user.cart.items,
    dataBill: body,
    date: Date.now(),
    state: 'Pendiente',
  });
  await order.save();
  await req.user.resetCart();
  res.redirect('/orders');
}

async function updateOrder(req, res) {
  const order = await Order.findById(req.params.id);
  order.updateState(req.body.state);
  res
    .status(200)
    .json({msg: `Nuevo estado ${req.body.state} establecido para la orden`});
}

function removeOrder(req, res) {}

module.exports = {
  addOrder,
  getOrder,
  getOrders,
  ordersList,
  removeOrder,
  updateOrder,
};
