const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'db',
  'products.json'
);

class Product {
  constructor({
    id,
    title,
    description,
    price,
    image,
    stock,
    category,
    subcategory,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
    this.stock = stock;
    this.category = category;
    this.subcategory = subcategory;
    this.products = [];
  }

  static deleteProduct(id, cb = () => null) {
    fs.readFile(p, 'utf-8', (err, file) => {
      if (!err) {
        this.products = JSON.parse(file);
      }

      console.log(this.products)
      this.products = this.products.filter(
        productItem => productItem.id !== id
      );
      console.log(this.products)
      fs.writeFileSync(p, JSON.stringify(this.products), e => {
        console.log(e);
        cb();
      });
    });
  }

  save() {
    fs.readFile(p, 'utf-8', (err, file) => {
      if (!err) {
        this.products = JSON.parse(file);
      }
      const {products, ...data} = this;
      this.products.push(data);
      fs.writeFileSync(p, JSON.stringify(this.products), e => {
        console.log(e);
      });
    });
  }

  static fetchAll(cb = () => null) {
    fs.readFile(p, 'utf-8', (err, file) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(file));
    });
  }

  static fetchById(id, cb = () => null) {
    fs.readFile(p, 'utf-8', (err, file) => {
      if (err) {
        this.products = [];
      }
      this.products = JSON.parse(file);
      if (!this.products.length) cb({});
      const product = this.products.filter(prod => prod.id === id);
      cb(product);
    });
  }

  static updateProduct(data, cb = () => null) {
    fs.readFile(p, 'utf-8', (err, file) => {
      if (err) {
        this.products = [];
      }
      this.products = JSON.parse(file);
      let newProduct = {};
      const productUpdated = this.products.map(prod => {
        if (prod.id === data.id) {
          prod = data;
          newProduct = prod;
        }
        return prod;
      });
      this.products = productUpdated;
      fs.writeFileSync(p, JSON.stringify(this.products), e => {
        console.log(e);
      });
      cb(newProduct);
    });
  }
}

module.exports = Product;
