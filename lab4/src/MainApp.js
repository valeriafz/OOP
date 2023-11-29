"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var ArrayStack_1 = require("./ArrayStack");
var LinkedListStack_1 = require("./LinkedListStack");
var ObjectStack_1 = require("./ObjectStack");

var arrayStack = new ArrayStack_1.default();
var linkedListStack = new LinkedListStack_1.default();
var objectStack = new ObjectStack_1.default();

const addElements = () => {
  for (let i = 0; i < arguments.length; i++) {
    const item = arguments[i];
    arrayStack.push(item);
    linkedListStack.push(item);
    objectStack.push(item);
  }

  console.log("This is your array:");
};
addElements(1, 2, 3, 4);

console.log("Array Stack Before Pop:", arrayStack);
arrayStack.pop();
console.log("Array Stack After Pop:", arrayStack);
console.log("Array Stack Peek:", arrayStack.peek());

console.log("Linked List Before Pop:", linkedListStack);
linkedListStack.pop();
console.log("Linked List After Pop:", linkedListStack);
console.log("Linked List Stack Peek:", linkedListStack.peek());

console.log("Object Stack Before Pop:", objectStack);
objectStack.pop();
console.log("Object Stack After Pop:", objectStack);
console.log("Object Stack Peek:", objectStack.peek());
