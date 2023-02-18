function get404(req, res) {
  res.render('404', {
    docTitle: 'Page not found.',
    itemsInCart: req.itemsInCart,
    orderList: req.orderAmount,
  });
}

module.exports = {get404};
