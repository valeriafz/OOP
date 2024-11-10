class DiscountDecorator {
  constructor(product, discount) {
    this.product = product;
    this.discount = discount;
  }

  getDiscountedPrice() {
    return this.product.price - this.product.price * this.discount;
  }

  getDetails() {
    return `${
      this.product.name
    } (Discounted Price: $${this.getDiscountedPrice()})`;
  }
}

module.exports = DiscountDecorator;
