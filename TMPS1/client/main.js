const Admin = require("../domain/factory/AdminSingleton");
const ProductFactory = require("../domain/factory/ProductFactory");
const UserBuilder = require("../domain/factory/UserBuilder");

console.log("Singleton example:");
const admin1 = new Admin("Alice");
const admin2 = new Admin("Bob");
console.log(admin1.getDetails());
console.log(admin2.getDetails());

console.log("Factory Method example:");
const productFactory = new ProductFactory();
const laptop = productFactory.createProduct("Electronics", "Laptop", 1200);
const sofa = productFactory.createProduct("Furniture", "Sofa", 500);
console.log(laptop.getDetails());
console.log(sofa.getDetails());

console.log("Builder example:");
const userBuilder = new UserBuilder();
const user = userBuilder
  .setName("John Doe")
  .setAge(30)
  .setEmail("john@example.com")
  .setAddress("123 Main St")
  .build();
console.log(user.getDetails());
