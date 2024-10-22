const Product = require("../models/Product");

class ProductFactory {
  createProduct(type, name, price) {
    return new Product(type, name, price);
  }
}

module.exports = ProductFactory;
