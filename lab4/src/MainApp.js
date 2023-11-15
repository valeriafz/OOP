"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayStack_1 = require("./ArrayStack");
var LinkedListStack_1 = require("./LinkedListStack");
var ObjectStack_1 = require("./ObjectStack");
var arrayStack = new ArrayStack_1.default();
arrayStack.push(1);
arrayStack.push(2);
arrayStack.push(3);
console.log(arrayStack.pop()); // 3
console.log(arrayStack.peek()); // 2
var linkedListStack = new LinkedListStack_1.default();
linkedListStack.push(1);
linkedListStack.push(2);
linkedListStack.push(3);
console.log(linkedListStack.pop()); // 3
console.log(linkedListStack.peek()); // 2
var objectStack = new ObjectStack_1.default();
objectStack.push(1);
objectStack.push(2);
objectStack.push(3);
console.log(objectStack.pop()); // 3
console.log(objectStack.peek()); // 2
