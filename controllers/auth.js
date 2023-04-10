const User = require('../models/user');
const bcrypt = require('bcrypt');
const sendEmail = require('../util/sendEmail');
const confirmTemplate = require('../email-templates/confirmAccount');

function loginView(req, res) {
  if (req.session.isLoggedIn) {
    return res.redirect('/');
  }

  const messageError = req.flash('error');
  res.render('auth/login', {
    docTitle: 'login',
    activeLink: 'login',
    itemsInCart: 0,
    orderList: 0,
    isLoggedIn: req.session.isLoggedIn,
    messageError: messageError.length ? messageError : '',
  });
}

async function loginIn(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    req.messageError = req.flash('error', 'Email y contraseña son requeridos.');
    return res.redirect('/login');
  }

  const user = await User.findOne({email});

  if (user) {
   await bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result){
        req.messageError = req.flash(
          'error',
          'Los datos ingresados son incorrectos.'
        );
        return res.redirect('/login');
      }
      req.itemsInCart = [];
      req.orderAmount = 0;
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(() => {
        res.redirect('/');
      });
    });
    return;
  }
  req.messageError = req.flash(
    'error',
    'Los datos ingresados son incorrectos.'
  );
  return res.redirect('/login');
}

async function loginOut(req, res) {
  req.session.destroy(() => {
    res.status(200).json({msg: 'session terminated'});
  });
}

function signUpView(req, res) {
  const messageError = req.flash('error');
  res.render('auth/register', {
    isLoggedIn: req.session.isLoggedIn,
    docTitle: 'Registro',
    activeLink: 'signUp',
    messageError: messageError.length ? messageError : '',
  });
}

async function signUp(req, res) {
  const {email, name, lastname, password} = req.body;

  //check missing value
  if (!email || !name || !lastname || !password) {
    req.messageError = req.flash('error', 'Algunos campos no fueron enviados.');
    return res.redirect('/sign-up');
  }

  //check if the email already exists
  const exist = await User.findOne({email});

  if (exist) {
    req.messageError = req.flash('error', 'El correo enviado ya existe.');
    return res.redirect('/sign-up');
  }

  const saltos = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, saltos);

  const user = new User({
    email,
    name,
    lastname,
    password: pass,
    cart: {items: []},
  });


  await user.save();
  const userCreated = await User.findOne({email});
  await sendEmail(
    email,
    confirmTemplate(
      userCreated.name,
      userCreated.lastname,
      userCreated._id.toString()
    )
  );
  req.session.isLoggedIn = true;
  req.session.user = userCreated;
  req.session.save(() => {
    res.redirect('/');
  });
}

function recoverPassView(req, res) {
  res.render('auth/recoverpass', {
    isLoggedIn: req.session.isLoggedIn,
    docTitle: 'Recuperar contraseña',
    activeLink: 'Login',
  });
}

async function confirmAccount(req, res) {
  const {id} = req.params;

  await User.updateOne({_id: id}, {validated: true});
  const user = await User.findById(id).select('name lastname');

  res.render('auth/confirmAccount', {
    docTitle: 'login',
    activeLink: 'login',
    itemsInCart: 0,
    orderList: 0,
    isLoggedIn: req.session.isLoggedIn,
    user: `${user.name} ${user.lastname}`,
  });
}

module.exports = {
  loginView,
  loginIn,
  loginOut,
  signUpView,
  signUp,
  recoverPassView,
  confirmAccount,
};
