class User {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(`${this.name} received notification: ${message}`);
  }
}

module.exports = User;
