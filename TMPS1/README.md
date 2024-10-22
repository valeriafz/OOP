# Creational Design Patterns in JavaScript

## Project Overview

This project demonstrates my implementation of Creational Design Patterns in JavaScript. The design patterns showcased are:

- Singleton
- Factory Method
- Builder

Each pattern is implemented within the context of a very basic e-commerce domain, involving entities such as Product, User, and Admin. The goal of this project is to illustrate how different object creation mechanisms can be used effectively.

## Domain Structure

The project is divided into two main folders:

- `client/`: Contains the entry point for the project where the patterns are demonstrated.
- `domain/`: Contains the core logic, divided into two subfolders:
  - `factory/`: Holds the files responsible for implementing the various creational design patterns.
  - `models/`: Contains the core entity classes such as Product and User.

## Project Structure

```bash
/client
  main.js           # Entry point to run the project

/domain
  /factory
    AdminSingleton.js  # Singleton pattern for Admin instance
    ProductFactory.js  # Factory Method pattern for creating products
    UserBuilder.js     # Builder pattern for creating User profiles
  /models
    Product.js         # Product class (model)
    User.js           # User class (model)
```

## Creational Design Patterns

### 1. Singleton Pattern

File: `domain/factory/AdminSingleton.js`

The Singleton Pattern ensures that a class has only one instance and provides a global point of access to that instance. In this project, the Admin class follows the Singleton pattern to ensure there is only one admin instance across the application.

```javascript
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
```

#### Usage Example

In the client code, I have attempted to create two Admin instances, but both admin1 and admin2 refer to the same instance.

```javascript
const admin1 = new Admin("Alice");
const admin2 = new Admin("Bob");

console.log(admin1.getDetails()); // Output: Admin: Alice
console.log(admin2.getDetails()); // Output: Admin: Alice
```

Even though I have tried to create admin2 with the name Bob, the Singleton pattern ensures that only one Admin instance (the one with the name Alice) exists.

### 2. Factory Method Pattern

File: `domain/factory/ProductFactory.js`

The Factory Method Pattern defines an interface for creating objects but allows subclasses or factories to alter the type of objects that will be created. Here, the ProductFactory class dynamically creates Product objects based on product type.

```javascript
class ProductFactory {
  createProduct(type, name, price) {
    return new Product(type, name, price);
  }
}

module.exports = ProductFactory;
```

#### Usage Example

In the client code, different types of products can be created without modifying the underlying Product class directly.

```javascript
const productFactory = new ProductFactory();
const laptop = productFactory.createProduct("Electronics", "Laptop", 1200);
const sofa = productFactory.createProduct("Furniture", "Sofa", 500);

console.log(laptop.getDetails()); // Output: Electronics - Laptop: $1200
console.log(sofa.getDetails()); // Output: Furniture - Sofa: $500
```

### 3. Builder Pattern

File: `domain/factory/UserBuilder.js`

The Builder Pattern provides a way to construct complex objects step by step. In this project, I have used the builder pattern to construct a User object with multiple optional attributes (name, age, email, address).

```javascript
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
```

#### Usage Example

The builder pattern allows for flexible construction of User objects, enabling different configurations based on the user's needs.

```javascript
const userBuilder = new UserBuilder();
const user = userBuilder
  .setName("John Doe")
  .setAge(30)
  .setEmail("john@example.com")
  .setAddress("123 Main St")
  .build();

console.log(user.getDetails()); // Output: User: John Doe, Age: 30, Email: john@example.com, Address: 123 Main St
```

## Running the Project

To run the project and see the patterns in action, execute the following command:

```bash
node client/main.js
```

This will output the results demonstrating the use of Singleton, Factory Method, and Builder patterns.

## Conclusion

This project demonstrates how Creational Design Patterns like Singleton, Factory Method, and Builder can be effectively used in JavaScript to manage the creation of objects. My idea for this idea wasn't complex at all, but is successfully showcases the benefits of using creational design patterns. These patterns improve code organization, flexibility, and maintainability, especially in more complex applications where object instantiation can vary based on dynamic requirements.
