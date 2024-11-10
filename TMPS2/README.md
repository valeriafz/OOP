# Laboratory Work on Structural Design Patterns in JavaScript

## Introduction

For this project, I extended my e-commerce application from Laboratory 1 by implementing structural design patterns in JavaScript: I chose three patterns—**Adapter**, **Decorator**, and **Facade**—to streamline complex interactions and enable dynamic behavior without altering existing code. Using these patterns allows me to scale the system more effectively, ensuring that each component is adaptable and extensible.

## Theory

Structural design patterns define simple ways to structure complex relationships between objects. Here’s a quick overview of the patterns used in this project:

- **Adapter**: Converts an interface of a class into another interface expected by the client, allowing integration with third-party systems.
- **Decorator**: Adds new behaviors or responsibilities to objects dynamically without modifying their structure.
- **Facade**: Provides a simplified interface to complex subsystems, reducing the client's interaction requirements with individual components.

## Implementation & Explanation

### 1. Adapter Pattern

To demonstrate the Adapter pattern, I implemented a `PaymentAdapter` to integrate an external payment API with my e-commerce application. The `PaymentAdapter` class translates the API’s payment processing method into a method expected by the system. This enables a consistent interface for handling payments, regardless of the underlying API specifics.

#### Code Snippet: PaymentAdapter.js (Located in `domain/adapters/PaymentAdapter.js`)

```javascript
class PaymentAdapter {
  constructor(paymentAPI) {
    this.paymentAPI = paymentAPI;
  }

  processPayment(amount) {
    // Adapt the payment method to the system’s requirements
    return this.paymentAPI.makePayment(amount);
  }
}
```

The `PaymentAdapter` class accepts an external `paymentAPI` object and wraps its `makePayment` method. I can now use this adapter to process payments without exposing the client to the API’s original interface.

### 2. Decorator Pattern

The Decorator pattern is used here to add a discount to `Product` objects dynamically. Instead of modifying the `Product` class from my previous lab, I created a `DiscountDecorator` that wraps a product instance, calculating and returning the discounted price.

#### Code Snippet: DiscountDecorator.js (Located in `domain/decorators/DiscountDecorator.js`)

```javascript
class DiscountDecorator {
  constructor(product, discount) {
    this.product = product;
    this.discount = discount;
  }

  getDiscountedPrice() {
    return this.product.price - this.product.price * this.discount;
  }

  getDetails() {
    return `${
      this.product.name
    } (Discounted Price: $${this.getDiscountedPrice()})`;
  }
}
```

The `DiscountDecorator` class allows me to apply a discount to any `Product` instance without altering the product’s structure. This approach is efficient and easily extensible, as I can stack multiple decorators if needed.

### 3. Facade Pattern

The Facade Pattern is a structural design pattern that provides a simplified interface to a complex system of subsystems. It allows you to interact with a collection of related classes through a single class. This pattern is especially useful when the system is made up of multiple classes that can have complex interdependencies. By using a facade, the complexity of the system is hidden from the client, making the code easier to maintain and understand. I created a `ShopFacade` class to centralize actions like creating products, registering users, and retrieving admin details. This way, the client (`main.js`) interacts only with the facade, making code cleaner and easier to maintain.

The `ShopFacade` class initializes the necessary subsystems such as `Admin`, `ProductFactory`, and `UserBuilder`. It provides three main methods: `createProduct()`, `registerUser()`, and `getAdminDetails()`. These methods abstract away the internal details of product creation, user registration, and admin information retrieval.

#### Code Snippets: ShopFacade.js (Located in `domain/facades/ShopFacade.js`)

#### Product Creation

```javascript
createProduct(type, name, price) {
  return this.productFactory.createProduct(type, name, price);
}
```

In the `createProduct()` method, the facade simplifies product creation by directly calling the `ProductFactory`'s `createProduct()` method. This way, the client doesn't need to interact with the `ProductFactory` directly.

#### User Registration

```javascript
registerUser(name, age, email, address) {
  return this.userBuilder
    .setName(name)
    .setAge(age)
    .setEmail(email)
    .setAddress(address)
    .build();
}
```

Similarly, the `registerUser()` method simplifies the user registration process. It uses the `UserBuilder` to set various user attributes and build the user object. The client only needs to provide the necessary information, and the facade handles the rest.

#### Admin Details

```javascript
getAdminDetails() {
  return this.admin.getDetails();
}
```

The `getAdminDetails()` method provides a simple way for the client to access the admin information. It delegates the task to the `Admin` class, which handles the internal details.

By using `ShopFacade`, I abstract the complexities involved in product creation, user registration, and admin management. This lets the client focus on higher-level operations without worrying about underlying details.

## Results

Upon running `main.js` in the `client` folder, the expected output was:

```plaintext
Admin: Alice
Product { type: 'Electronics', name: 'Smartphone', price: 1000 }
Smartphone (Discounted Price: $900)
User { name: 'John Doe', age: 30, email: 'john@example.com', address: '123 Main St' }
Processed payment of $900
```

### Explanation

1. **Admin Details**: `ShopFacade` initializes the singleton `Admin` instance.
2. **Product Creation**: A new `Product` is created via the `ProductFactory`.
3. **Discount Application**: The `DiscountDecorator` applies a 10% discount to the product.
4. **User Registration**: `UserBuilder` creates a new user with specified details.
5. **Payment Processing**: `PaymentAdapter` processes the discounted amount using an external payment API.

## Conclusion

Using these structural design patterns in my e-commerce project has simplified code management and improved flexibility. The Adapter pattern made integrating external APIs easier; the Decorator allowed dynamic product modifications; and the Facade provided a unified, simplified interface for complex interactions. These patterns enable a more scalable and maintainable architecture, essential for expanding features and integrating new functionalities.
