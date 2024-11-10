// client/main.js
const ShopFacade = require("../domain/facades/ShopFacade");
const PaymentAdapter = require("../domain/adapters/PaymentAdapter");
const DiscountDecorator = require("../domain/decorators/DiscountDecorator");

// Initialize facade
const shop = new ShopFacade("Alice");

// Admin details
console.log(shop.getAdminDetails());

// Create a product
const product = shop.createProduct("Electronics", "Smartphone", 1000);
console.log(product);

// Apply discount decorator
const discountedProduct = new DiscountDecorator(product, 0.1);
console.log(discountedProduct.getDetails());

// Register a user
const user = shop.registerUser(
  "John Doe",
  30,
  "john@example.com",
  "123 Main St"
);
console.log(user);

// Process payment using adapter
const paymentAPI = {
  makePayment: (amount) => `Processed payment of $${amount}`,
};

const paymentAdapter = new PaymentAdapter(paymentAPI);

console.log(
  paymentAdapter.processPayment(discountedProduct.getDiscountedPrice())
);
