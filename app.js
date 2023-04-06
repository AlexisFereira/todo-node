const express = require('express');
const bodyparser = require('body-parser');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const path = require('path');
const errorCtrl = require('./controllers/error');
const app = express();
const port = 8040;
const {cart} = require('./controllers/cart');
const {ordersList} = require('./controllers/orders');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.json());

app.use('/', (req, res, next) => {
  req.itemsInCart = cart.products.length;
  req.orderAmount = ordersList.length;
  req.userId = '123';
  next();
});
app.use('/admin', adminData.routes);
app.use(cartRouter);
app.use(shopRouter);
app.use(orderRouter);

app.use('/', errorCtrl.get404);

app.listen(port, () => {
  console.log('Listening Port: ' + port + ' :::::');
});
