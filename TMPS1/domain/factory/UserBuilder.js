const User = require("../models/User");

class UserBuilder {
  constructor() {
    this.name = "";
    this.age = 0;
    this.email = "";
    this.address = "";
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  setAddress(address) {
    this.address = address;
    return this;
  }

  build() {
    return new User(this.name, this.age, this.email, this.address);
  }
}

module.exports = UserBuilder;
