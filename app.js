const express = require('express');
const bodyparser = require('body-parser');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');
const cartRouter = require('./routes/cart');
const path = require('path');
const rootdir = require('./util/path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: false}));

app.use('/admin', adminData.routes);
app.use(cartRouter);
app.use(shopRouter);

app.use('/', (req, res) => {
  //res.status(404).send('<h1>Page not found.</h1>');
  //res.sendFile(path.join(rootdir, 'views', '404.html'));
  res.render('404', {
    docTitle: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log('Listening Port: ' + port + ' :::::');
});
