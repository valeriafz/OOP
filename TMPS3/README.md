# Laboratory Work: Behavioral Design Patterns

## **Introduction**

In this laboratory work, I demonstrate the implementation of the **Command** and **Observer** behavioral design patterns in an e-commerce application. These patterns are applied to enhance flexibility, maintainability, and scalability by decoupling components, managing undoable operations, and notifying users of updates regarding their subscriptions.

---

## **Theory**

- **Observer Pattern**: The **Observer Pattern** creates a one-to-many dependency between objects, where changes in one object automatically notify all its dependents. In an e-commerce system, this is ideal for notifying users about product availability, discounts, or updates to product information.
- **Command Pattern**: The **Command Pattern** encapsulates requests as objects. This allows operations to be parameterized, queued, logged, and, importantly, undone. This pattern is useful for handling product operations like adding, updating, or removing products in an e-commerce system.

---

## **Implementation**

Below are the code implementations of the **Observer** and **Command** patterns in the context of a product management system in an e-commerce platform.

---

### **Observer Pattern Implementation**

#### **Observer Class** (`Observer.js`)

```javascript
  subscribe(subscriber) {
    this.subscribers.push(subscriber); // Adds a new subscriber
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber); // Removes a subscriber
  }

  notify(message) {
    this.subscribers.forEach((subscriber) => subscriber.update(message)); // Notify all subscribers
  }
```

- **Explanation**: The `Observer` class is responsible for managing a list of subscribers (e.g., users). It provides methods to:
  - **`subscribe`**: Add a user to the subscriber list.
  - **`unsubscribe`**: Remove a user from the list.
  - **`notify`**: Notify all subscribers about an event.

#### **User Class** (`User.js`)

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(`${this.name} received: ${message}`); // Handle notification
  }
}
```

- **Explanation**: The `User` class represents a subscriber. It has an `update` method that handles incoming notifications, which in this case is a simple log message indicating that the user has received the update.

---

### **Command Pattern Implementation**

#### **AddProductCommand Class** (`AddProductCommand.js`)

```javascript
  execute() {
    this.admin.products.push(this.product);
    console.log(`Product added: ${JSON.stringify(this.product)}`);
  }

  undo() {
    this.admin.products = this.admin.products.filter(
      (p) => p.id !== this.product.id
    );
    console.log(`Product removed: ID ${this.product.id}`);
  }
```

- **Explanation**: The `AddProductCommand` class encapsulates the action of adding a product to the inventory. It has:
  - **`execute`**: Adds the product to the `admin.products` array and logs the action.
  - **`undo`**: Removes the product from the inventory and logs the action.

#### **RemoveProductCommand Class** (`RemoveProductCommand.js`)

```javascript
  execute() {
    this.removedProduct = this.admin.products.find(
      (p) => p.id === this.productId
    ); // Find product
    this.admin.products = this.admin.products.filter(
      (p) => p.id !== this.productId
    ); // Remove product from inventory
    console.log(`Product removed: ID ${this.productId}`);
  }

  undo() {
    if (this.removedProduct) {
      this.admin.products.push(this.removedProduct); // Restore the removed product
      console.log(`Product restored: ${JSON.stringify(this.removedProduct)}`);
    }
  }
```

- **Explanation**: The `RemoveProductCommand` class encapsulates the action of removing a product from the inventory. It has:
  - **`execute`**: Removes a product and logs the action.
  - **`undo`**: Restores the removed product if available.

---

## **Results**

### **Observer Pattern Output**

In the main application, I simulate notifying users about a product update.

```javascript
// Create users
const alice = new User("Alice");
const bob = new User("Bob");

productObserver.subscribe(alice);
productObserver.subscribe(bob);

// Notify users about a new product
productObserver.notify("New product added: Awesome Gadget");

// Remove Alice from the subscription
productObserver.unsubscribe(alice);

// Notify remaining users
productObserver.notify("Price drop on Cool Widget!");
```

**Expected Output**:

```
Alice received: New product added: Awesome Gadget
Bob received: New product added: Awesome Gadget
Bob received: Price drop on Cool Widget!
```

- **Explanation**: Alice and Bob receive the first notification. After Alice unsubscribes, only Bob receives the second notification.

---

### **Command Pattern Output**

In the main application, I simulate adding and removing products with undo functionality. The admin is an extension of the Singleton pattern from lab 1, using Decorator to extend its capabilities (in my case, adding and removing products).

```javascript
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

// Execute commands
addProduct1.execute();
addProduct2.execute();

// Undo the last command (removal)
removeProduct1.execute();

// Undo the removal (restore product)
removeProduct1.undo();
```

**Expected Output**:

```
Product added: {"id":1,"name":"Awesome Gadget","price":99.99}
Product added: {"id":2,"name":"Cool Widget","price":49.99}
[ { id: 1, name: 'Awesome Gadget', price: 99.99 }, { id: 2, name: 'Cool Widget', price: 49.99 } ]
Product removed: ID 1
[ { id: 2, name: 'Cool Widget', price: 49.99 } ]
Product restored: {"id":1,"name":"Awesome Gadget","price":99.99}
[ { id: 2, name: 'Cool Widget', price: 49.99 }, { id: 1, name: 'Awesome Gadget', price: 99.99 } ]
```

- **Explanation**: The output shows the result of adding products, removing one, and then undoing the removal of the product, with the product inventory being updated accordingly.

---

## **Conclusion**

### **Results Summary**

1. **Observer Pattern**:

   - Successfully notified users about product updates in real-time.
   - Demonstrated the subscription and unsubscription of users, allowing for dynamic notifications.

2. **Command Pattern**:
   - Managed product operations (add/remove) as commands, providing clear encapsulation and supporting undo/redo functionality.
   - Enabled the restoration of removed products through the undo feature.

### **Conclusion**

The **Observer Pattern** effectively keeps users informed about changes, improving user engagement. The **Command Pattern** allows for flexible product management and supports undo/redo functionality, making it easier to manage product operations. Both patterns contribute to building a robust, scalable, and maintainable e-commerce system.
