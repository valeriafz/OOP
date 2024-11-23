class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  notify(data) {
    this.subscribers.forEach((subscriber) => subscriber.update(data));
  }
}

module.exports = Observer;
