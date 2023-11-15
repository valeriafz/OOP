"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayStack_1 = require("./ArrayStack");
var LinkedListStack_1 = require("./LinkedListStack");
var ObjectStack_1 = require("./ObjectStack");
var arrayStack = new ArrayStack_1.default();
arrayStack.push(1);
arrayStack.push(2);
arrayStack.push(3);
console.log(arrayStack.pop());
console.log(arrayStack.peek());

var linkedListStack = new LinkedListStack_1.default();
linkedListStack.push(4);
linkedListStack.push(5);
linkedListStack.push(6);
console.log(linkedListStack.pop());
console.log(linkedListStack.peek());

var objectStack = new ObjectStack_1.default();
objectStack.push(7);
objectStack.push(8);
objectStack.push(9);
console.log(objectStack.pop());
console.log(objectStack.peek());
