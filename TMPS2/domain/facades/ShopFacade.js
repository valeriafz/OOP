const Admin = require("../../../TMPS1/domain/factory/AdminSingleton");
const ProductFactory = require("../../../TMPS1/domain/factory/ProductFactory");
const UserBuilder = require("../../../TMPS1/domain/factory/UserBuilder");

class ShopFacade {
  constructor(adminName) {
    this.admin = new Admin(adminName);
    this.productFactory = new ProductFactory();
    this.userBuilder = new UserBuilder();
  }

  createProduct(type, name, price) {
    return this.productFactory.createProduct(type, name, price);
  }

  registerUser(name, age, email, address) {
    return this.userBuilder
      .setName(name)
      .setAge(age)
      .setEmail(email)
      .setAddress(address)
      .build();
  }

  getAdminDetails() {
    return this.admin.getDetails();
  }
}

module.exports = ShopFacade;
