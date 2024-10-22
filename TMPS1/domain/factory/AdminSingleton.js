class Admin {
  constructor(name) {
    if (Admin.instance) {
      return Admin.instance;
    }
    this.name = name;
    Admin.instance = this;
    return this;
  }

  getDetails() {
    return `Admin: ${this.name}`;
  }
}

module.exports = Admin;
