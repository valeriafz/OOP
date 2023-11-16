"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectStack = /** @class */ (function () {
    function ObjectStack() {
        this.stack = {};
        this.stackSize = 0;
    }
    ObjectStack.prototype.push = function (item) {
        this.stack[this.stackSize] = item;
        this.stackSize++;
    };
    ObjectStack.prototype.pop = function () {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        var poppedItem = this.stack[this.stackSize - 1];
        delete this.stack[this.stackSize - 1];
        this.stackSize--;
        return poppedItem;
    };
    ObjectStack.prototype.peek = function () {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.stack[this.stackSize - 1];
    };
    ObjectStack.prototype.isEmpty = function () {
        return this.stackSize === 0;
    };
    ObjectStack.prototype.size = function () {
        return this.stackSize;
    };
    ObjectStack.prototype.clear = function () {
        this.stack = {};
        this.stackSize = 0;
    };
    return ObjectStack;
}());
exports.default = ObjectStack;
