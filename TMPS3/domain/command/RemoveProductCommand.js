const Command = require("./Command");

class RemoveProductCommand extends Command {
  constructor(admin, productId) {
    super();
    this.admin = admin;
    this.productId = productId;
    this.removedProduct = null;
  }

  execute() {
    this.removedProduct = this.admin.products.find(
      (p) => p.id === this.productId
    );
    this.admin.products = this.admin.products.filter(
      (p) => p.id !== this.productId
    );
    console.log(`Product removed: ID ${this.productId}`);
  }

  undo() {
    if (this.removedProduct) {
      this.admin.products.push(this.removedProduct);
      console.log(`Product restored: ${JSON.stringify(this.removedProduct)}`);
    }
  }
}

module.exports = RemoveProductCommand;
