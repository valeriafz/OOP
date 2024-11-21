const ShopFacade = require("../domain/facades/ShopFacade");
const PaymentAdapter = require("../domain/adapters/PaymentAdapter");
const DiscountDecorator = require("../domain/decorators/DiscountDecorator");

const shop = new ShopFacade("Alice");

console.log(shop.getAdminDetails());

const product = shop.createProduct("Electronics", "Smartphone", 1000);
console.log(product);

const discountedProduct = new DiscountDecorator(product, 0.1);
console.log(discountedProduct.getDetails());

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
