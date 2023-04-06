const fs = require('fs');
const uuid = require('uuid').v4;
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'db',
  'orders.json'
);

class Order {
  constructor({articlesAmount, products, dataBill, total}) {
    this.order = {
      id: uuid(),
      date: Date.now(),
      state: 'pendiente',
      articlesAmount: articlesAmount,
      products: products,
      dataBill,
      total,
    };
  }

  static getOrders(cb) {
    fs.readFile(p, 'utf-8', (e, file) => {
      if (e || file === '') {
        cb([]);
      }
      const orders = JSON.parse(file);
      cb(orders);
    });
  }

  static getOrder(id, cb) {
    this.getOrders(orders => {
      const order = orders.find(orderItem => orderItem.id === id);
      cb(order);
    });
  }

  save(cb = () => null) {
    fs.readFile(p, 'utf-8', (e, file) => {
      if (e || file === '') {
        fs.writeFile(p, JSON.stringify([this.order]), e => {
          if (e) console.log({e});
          cb(this.order);
        });
        return;
      }
      let orders = JSON.parse(file);
      const currentorder = orders.some(ord => ord.id === this.order.id);
      if (currentorder) {
        orders = orders.map(ord => {
          if (ord.id === this.order.id) {
            ord = this.order;
          }
          return ord;
        });
      } else {
        orders.push(this.order);
      }
      fs.writeFile(p, JSON.stringify(orders), e => {
        if (e) console.log(e);
        cb(this.order);
      });
    });
  }
}

module.exports = Order;
