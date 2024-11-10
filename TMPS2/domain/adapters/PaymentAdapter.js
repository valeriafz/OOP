class PaymentAdapter {
  constructor(paymentAPI) {
    this.paymentAPI = paymentAPI;
  }

  processPayment(amount) {
    return this.paymentAPI.makePayment(amount);
  }
}

module.exports = PaymentAdapter;
