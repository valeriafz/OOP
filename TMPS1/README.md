
# Creational Design Patterns in JavaScript

## Project Overview

This project demonstrates Creational Design Patterns, focusing on how object creation can be managed through:

- **Singleton**: Restricts a class to a single instance.
- **Factory Method**: Provides a way to create objects without specifying the exact class.
- **Builder**: Constructs complex objects step-by-step with a flexible configuration.

## Domain Structure

The project is organized into:

- **`client/`**: Entry point to run the project.
- **`domain/`**: Core logic with two subfolders:
  - **`factory/`**: Implements the design patterns.
  - **`models/`**: Contains main entity classes like Product and User.

---

## Creational Design Patterns

### 1. Singleton Pattern

The **Singleton Pattern** limits a class to a single instance. Here, it ensures only one Admin instance is created across the app.

#### Core Code Snippet

```javascript
class Admin {
  constructor(name) {
    if (Admin.instance) return Admin.instance;
    this.name = name;
    Admin.instance = this;
  }

  getDetails() {
    return `Admin: ${this.name}`;
  }
}

```

If `Admin.instance` exists, the constructor returns it, ensuring only one instance. If the instance doesn’t exist, it’s set with `this.name`. It sets global access, as the same Admin instance is reused throughout the app.

#### Usage Example

```javascript
const admin1 = new Admin("Alice");
const admin2 = new Admin("Bob");

console.log(admin1.getDetails()); // Admin: Alice
console.log(admin2.getDetails()); // Admin: Alice
```

Even though `admin2` is instantiated with "Bob," it returns the same instance created with "Alice."

---

### 2. Factory Method Pattern

The **Factory Method Pattern** defines an interface for creating objects but lets subclasses or factories decide the specific type. Here, `ProductFactory` generates Product objects based on a provided type.

#### Core Code Snippet

```javascript
class ProductFactory {
  createProduct(type, name, price) {
    return new Product(type, name, price);
  }
}

```

A dynamic creation takes place, as `ProductFactory` takes parameters (`type`, `name`, `price`) to create a Product without modifying the Product class. This method allows the creation of varied products with different specifications, streamlining instantiation, making it reusable.

#### Usage Example

```javascript
const productFactory = new ProductFactory();
const laptop = productFactory.createProduct("Electronics", "Laptop", 1200);
const sofa = productFactory.createProduct("Furniture", "Sofa", 500);

console.log(laptop.getDetails()); // Electronics - Laptop: $1200
console.log(sofa.getDetails());   // Furniture - Sofa: $500
```

By specifying types, products are created dynamically without needing to modify the base `Product` class.

---

### 3. Builder Pattern

The **Builder Pattern** allows creating objects with complex parameters step-by-step, allowing only the desired properties to be set.

#### Core Code Snippet

```javascript
class UserBuilder {
  constructor() {
    this.name = "";
    this.age = 0;
    this.email = "";
    this.address = "";
  }

  setName(name) { this.name = name; return this; }
  setAge(age) { this.age = age; return this; }
  setEmail(email) { this.email = email; return this; }
  setAddress(address) { this.address = address; return this; }

  build() {
    return new User(this.name, this.age, this.email, this.address);
  }
}

```

The code consists of chain setters, meaning methods like `setName` and `setEmail` set individual properties and return the builder instance, enabling chaining. Finally, `build()` finalizes the configuration, returning a complete User object with the selected properties.

#### Usage Example

```javascript
const userBuilder = new UserBuilder();
const user = userBuilder
  .setName("John Doe")
  .setAge(30)
  .setEmail("john@example.com")
  .setAddress("123 Main St")
  .build();

console.log(user.getDetails()); // User: John Doe, Age: 30, Email: john@example.com, Address: 123 Main St
```

With the builder pattern, different User configurations can be created as needed, making it flexible for optional attributes. It is more complex as Factory Method, as each chain setter is set sepparately.


## Running the Project

To run the project and see the patterns in action, execute the following command:

```bash
node client/main.js
```

This will output the results demonstrating the use of Singleton, Factory Method, and Builder patterns.

## Conclusion

This project demonstrates how Creational Design Patterns like Singleton, Factory Method, and Builder can be effectively used in JavaScript to manage the creation of objects. My idea for this idea wasn't complex at all, but is successfully showcases the benefits of using creational design patterns. These patterns improve code organization, flexibility, and maintainability, especially in more complex applications where object instantiation can vary based on dynamic requirements.
