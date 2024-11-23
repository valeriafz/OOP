const Command = require("./Command");

class AddProductCommand extends Command {
  constructor(admin, product) {
    super();
    this.admin = admin;
    this.product = product;
  }

  execute() {
    this.admin.products.push(this.product);
    console.log(`Product added: ${JSON.stringify(this.product)}`);
  }

  undo() {
    this.admin.products = this.admin.products.filter(
      (p) => p.id !== this.product.id
    );
    console.log(`Product removed: ID ${this.product.id}`);
  }
}

module.exports = AddProductCommand;
