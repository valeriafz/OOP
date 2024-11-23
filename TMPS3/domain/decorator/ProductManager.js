class ProductManagerDecorator {
  constructor(admin) {
    if (!admin.products) {
      admin.products = [];
    }
    this.admin = admin;
    this.history = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  undoLastCommand() {
    if (this.history.length > 0) {
      const lastCommand = this.history.pop();
      lastCommand.undo();
    } else {
      console.log("No commands to undo.");
    }
  }

  listProducts() {
    return this.admin.products;
  }
}

module.exports = ProductManagerDecorator;
