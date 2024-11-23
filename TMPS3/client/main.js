const Admin = require("../../TMPS1/domain/factory/AdminSingleton");
const ProductManagerDecorator = require("../domain/decorator/ProductManager");
const AddProductCommand = require("../domain/command/AddProductCommand");
const RemoveProductCommand = require("../domain/command/RemoveProductCommand");
const Observer = require("../domain/observer/Observer");
const User = require("../domain/observer/User");

(async function main() {
  console.log("--- Observer Pattern Example ---");

  const productObserver = new Observer();

  const user1 = new User("Alice");
  const user2 = new User("Bob");

  productObserver.subscribe(user1);
  productObserver.subscribe(user2);

  productObserver.notify("New product added: Awesome Gadget");
  productObserver.notify("Price drop on Cool Widget!");

  productObserver.unsubscribe(user1);

  productObserver.notify("Restocked: Popular Headphones");

  console.log("\n");
  console.log("--- Command Pattern Example ---");

  const admin = new Admin("AdminUser");

  const productManager = new ProductManagerDecorator(admin);

  const addProduct1 = new AddProductCommand(admin, {
    id: 1,
    name: "Awesome Gadget",
    price: 99.99,
  });
  const addProduct2 = new AddProductCommand(admin, {
    id: 2,
    name: "Cool Widget",
    price: 49.99,
  });

  const removeProduct1 = new RemoveProductCommand(admin, 1);

  productManager.executeCommand(addProduct1);
  productManager.executeCommand(addProduct2);

  console.log("Current products:", productManager.listProducts());

  productManager.undoLastCommand();
  console.log("After undo:", productManager.listProducts());

  productManager.executeCommand(removeProduct1);
  console.log("After removing product 1:", productManager.listProducts());

  productManager.undoLastCommand();
  console.log("After undo:", productManager.listProducts());
})();
