"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var ArrayStack_1 = require("./ArrayStack");
var LinkedListStack_1 = require("./LinkedListStack");
var ObjectStack_1 = require("./ObjectStack");

var arrayStack = new ArrayStack_1.default();
var linkedListStack = new LinkedListStack_1.default();
var objectStack = new ObjectStack_1.default();

const addElements = function () {
  for (let i = 0; i < arguments.length; i++) {
    const item = arguments[i];
    arrayStack.push(item);
    linkedListStack.push(item);
    objectStack.push(item);
  }

  console.log("This is your array:");
  console.log("Array Stack:", arrayStack);
  console.log("Linked List Stack:", linkedListStack);
  console.log("Object Stack:", objectStack);
};

addElements(1, 2, 3, 4);

console.log("Array Stack Before Pop:", arrayStack);
arrayStack.pop();
console.log("Array Stack After Pop:", arrayStack);
console.log("Array Stack Peek:", arrayStack.peek());

console.log("Linked List Stack Peek:", linkedListStack.peek());
linkedListStack.pop();

console.log("Object Stack Peek:", objectStack.peek());
objectStack.pop();
