"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var ArrayStack_1 = require("./ArrayStack");
var LinkedListStack_1 = require("./LinkedListStack");
var ObjectStack_1 = require("./ObjectStack");

var arrayStack = new ArrayStack_1.default();
var linkedListStack = new LinkedListStack_1.default();
var objectStack = new ObjectStack_1.default();

const addElements = (...items) => {
  arrayStack.push(...items);
  linkedListStack.push(...items);
  objectStack.push(...items);
  console.log("This is your array:");
  console.log("Array Stack:", arrayStack.toArray());
  console.log("Linked List Stack:", linkedListStack.toArray());
  console.log("Object Stack:", objectStack.toArray());
};

arrayStack.pop();
console.log("Array Stack Peek:", arrayStack.peek());

linkedListStack.pop();
console.log("Linked List Stack Peek:", linkedListStack.peek());

objectStack.pop();
console.log("Object Stack Peek:", objectStack.peek());

addElements(1, 2, 3, 4);
