const Product = require('../models/product');
const Comment = require('../models/comment');
const moment = require('moment');

async function getProducts(req, res) {
  const products = await Product.find({});
  const itemsInCart = req.user ? req.user.cart.items.lenght : 0;
  res.render('shop', {
    docTitle: 'Wellcome to my shop',
    products: products || [],
    canEdit: true,
    itemsInCart,
    orderList: req.orderAmount || 0,
    activeLink: 'shop',
    isLoggedIn: req.session.isLoggedIn,
  });
}

async function getProduct(req, res) {
  const id = req.params.id;
  const product = await Product.findById(id);
  const commentsList = await Comment.find({productId: product}).populate(
    'userId'
  );
  const comments = await commentsList.map(comment => ({
    date: moment(comment.date).format('DD / mm / yyyy'),
    text: comment.text,
    user: `${comment.userId.name} ${comment.userId.lastname}`,
  }));
  const related = await Product.find({
    $and: [{_id: {$not: {$eq: product._id}}}, {category: product.category}],
  }).limit(4);
  const itemsInCart = req.user ? req.user.cart.items.lenght : 0;
  res.render('shop/product', {
    docTitle: product.title,
    product,
    itemsInCart,
    orderList: req.orderAmount,
    activeLink: 'shop',
    isLoggedIn: req.session.isLoggedIn,
    related,
    comments,
  });
}

async function addProduct(req, res) {
  const data = req.body;
  data.userId = req.user;
  const product = new Product(data);
  await product.save();
  res.redirect('/');
}

async function deleteProduct(req, res) {
  const id = req.params.id;
  await Product.deleteOne({_id: id});
  res.status(200).send({msj: `${id} elimidado.`});
}

async function updateProduct(req, res) {
  const data = req.body;
  await Product.updateOne({_id: data.id}, data);
  res.redirect('/');
}

async function postComment(req, res) {
  const {body} = req;
  const comment = new Comment({
    productId: body.productId,
    text: body.text,
    userId: req.session.user._id.toString(),
    date: Date.now(),
  });
  await comment.save();
  res.status(200).json({msg: 'aqui:::'});
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  postComment,
};
