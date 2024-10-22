class User {
  constructor(name, age, email, address) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.address = address;
  }

  getDetails() {
    return `User: ${this.name}, Age: ${this.age}, Email: ${this.email}, Address: ${this.address}`;
  }
}

module.exports = User;
