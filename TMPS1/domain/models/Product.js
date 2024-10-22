class Product {
  constructor(type, name, price) {
    this.type = type;
    this.name = name;
    this.price = price;
  }

  getDetails() {
    return `${this.type} - ${this.name}: $${this.price}`;
  }
}

module.exports = Product;
