const express = require('express');
const bodyparser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const cartRouter = require('./routes/cart');
const path = require('path');
const rootdir = require('./util/path');

const app = express();
const port = 3000;
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use(cartRouter);
app.use(shopRouter);
app.use('/', (req, res) => {
  //res.status(404).send('<h1>Page not found.</h1>');
  res.sendFile(path.join(rootdir, 'views', '404.html'));
});

app.listen(port, () => {
  console.log('Listening Port: ' + port + ' :::::');
});
