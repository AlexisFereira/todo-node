const cart = {};

async function getCart(req, res) {
  req.user.populate('cart.items.productId').then(data => {
    const products = data.cart.items.map(item => ({
      _id: item.productId._id,
      quantity: item.quantity,
      total: item.productId.price * item.quantity,
      title: item.productId.title,
      image: item.productId.image,
      price: item.productId.price,
      description: item.productId.description,
    }));
    cart.products = products;
    cart.articlesAmount = products.reduce(
      (acum, index) => acum + index.quantity,
      0
    );
    cart.total = products.reduce(
      (acumulador, index) => acumulador + index.total,
      0
    );
    res.render('shop/cart', {
      docTitle: cart.products.length ? `Cart(${cart.products.length})` : 'Cart',
      cart,
      itemsInCart: cart.products.length,
      orderList: 0,
      activeLink: 'cart',
      isLoggedIn: req.session.isLoggedIn,
    });
  });
}

async function addProductToCart(req, res) {
  const {productId, quantity} = req.body;
  req.user.addToCart({
    productId,
    quantity,
  });
  res.redirect('/cart');
}

function removeProductFromCart(req, res) {
  const id = req.params.id;
  req.user.removeFromCart(id);
  res.status(200).json({msg: `Producto con el ${id} removido`});
}

async function updateCart(req, res) {
  const {type, id} = req.body;
  req.user.updateItemInCart(id, type === 'decrease');
  res.status(200).json({data: {}});
}

function purchase(req, res) {
  res.render('shop/purchase', {
    docTitle: 'Purchase',
    itemsInCart: req.session.user.cart.items.length,
    orderList: req.orderAmount,
    activeLink: 'cart',
    isLoggedIn: req.session.isLoggedIn,
  });
}

module.exports = {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  purchase,
  cart,
};
