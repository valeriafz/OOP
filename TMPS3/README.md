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

The `Observer` class acts as a subject or notifier, maintaining a list of subscribers (typically users or systems that are interested in certain events or changes). When a significant change occurs or an event is triggered, the Observer notifies all subscribers by calling their respective update method. This enables a one-to-many communication pattern, where multiple observers can react to the same event.

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
  - **`subscribe`**: This method adds a subscriber to the subscribers list. In practice, a "subscriber" could be any object that has an update method, like a User class. When a new subscriber (like a user) shows interest in receiving updates, they are added to the subscribers list using `push()`. If a new user wants to receive product updates, calling this method would add them to the list of subscribers.
  - **`unsubscribe`**: This method removes a subscriber from the list of subscribers. It ensures that the observer stops notifying the removed subscriber. The filter() method is used to create a new array that excludes the subscriber being unsubscribed. The subscriber is removed by reference, meaning the exact subscriber object is no longer part of the list. If a user no longer wants to receive updates, calling unsubscribe() would remove them from the subscriber list.
  - **`notify`**: This method sends a notification (the message) to all subscribers in the list (in my client code it's a simple `console.log` in the terminal). It iterates over each subscriber and invokes their update() method, passing the message as an argument.

#### **User Class** (`User.js`)

The `User` class acts as a subscriber that receives notifications from an observer. When an event occurs, such as the addition of a new product or a special offer, the User class's update method is called to handle the incoming message and take appropriate action.

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

- **Explanation**: The `User` class represents a subscriber. It has an `update` method that handles incoming notifications, which in this case is a simple log message indicating that the user has received the update: when the Observer sends a message (e.g., "New product added: Awesome Gadget!"), this method will print the message to the console. This method is called by the `Observer` class when there is a notification to be sent to the user.

---

### **Command Pattern Implementation**

#### **AddProductCommand Class** (`AddProductCommand.js`)

The `AddProductCommand` class is part of the `Command` Pattern implementation, extending it, which encapsulates actions (in this case, adding a product to the inventory) as objects. The class allows operations to be parameterized, logged, queued, and even undone.

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

- **Explanation**: The `AddProductCommand` class encapsulates the action of adding a product to the inventory. These methods define the behavior of adding and removing products from an inventory system, allowing the action to be reversed if needed:
  - **`execute`**: This method is called to perform the action of adding a product to the inventory. The product object, which is passed to the AddProductCommand when it is created, is pushed to the admin.products array, effectively adding it to the inventory. This action is logged with a message that includes the product's details (using JSON.stringify(this.product) to convert the object into a readable string).
  - **`undo`**: It allows the system to revert any changes made by the execute() method, providing the ability to undo product additions, which is especially useful for scenarios like canceling actions or supporting transactional operations. It does this by creating a new array with all products except the one that matches the given `product.id`, using the `filter()` method.

#### **RemoveProductCommand Class** (`RemoveProductCommand.js`)

The `RemoveProductCommand` class is an implementation of the `Command` Pattern, which encapsulates the action of removing a product from the inventory. This class enables the removal operation to be reversible, allowing the product to be restored if needed. Here's a breakdown of the class and its methods:

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
  - **`execute`**: Removes a product and logs the action. First, it searches for the product to be removed by its `id`. If the product is found, it is then removed from the inventory by filtering out the product using `filter()`, creating a new array that excludes the product with the matching id. Thus, it isolates this operation, making it easier to manage and track.
  - **`undo`**: It provides the ability to reverse the removal action if it was performed in error, essentially restoring the product to the inventory. If the product exists, it is pushed back into the `admin.products` array using `push()`, effectively restoring it to the inventory.

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
