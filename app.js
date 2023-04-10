const express = require('express');
const bodyparser = require('body-parser');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const authRouter = require('./routes/auth');
const path = require('path');
const errorCtrl = require('./controllers/error');
const app = express();
const port = 8040;
const db = require('./util/dbconnection');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('express-mongodb-session')(session);
const flash = require('connect-flash');

const store = new MongoDBStore({
  uri: 'mongodb://root:1234@localhost:27017/catalogodb?authSource=admin',
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());

const sess = {
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: false,
  store,
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user).then(user => {
    req.user = user;
    next();
  });
});

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use('/admin', adminData.routes);
app.use(cartRouter);
app.use(shopRouter);
app.use(orderRouter);
app.use(authRouter);

app.use('/', errorCtrl.get404);

db(async () => {
  const exists = await User.find({email: 'alexis.fereira@gmail.com'});
  if (!exists.length) {
    const user = new User({
      name: 'Alexis',
      lastname: 'Fereira',
      email: 'alexis.fereira@gmail.com',
      cart: [],
    });
    await user.save();
  }
  app.listen(port, () => {
    console.log('Listening Port: ' + port + ' :::::');
  });
});
