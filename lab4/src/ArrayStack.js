"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayStack = /** @class */ (function () {
    function ArrayStack() {
        this.items = [];
    }
    ArrayStack.prototype.push = function (item) {
        this.items.push(item);
    };
    ArrayStack.prototype.pop = function () {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items.pop();
    };
    ArrayStack.prototype.peek = function () {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    };
    ArrayStack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    ArrayStack.prototype.size = function () {
        return this.items.length;
    };
    ArrayStack.prototype.clear = function () {
        this.items = [];
    };
    return ArrayStack;
}());
exports.default = ArrayStack;
