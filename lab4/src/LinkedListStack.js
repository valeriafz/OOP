"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
        this.next = null;
    }
    return Node;
}());
var LinkedListStack = /** @class */ (function () {
    function LinkedListStack() {
        this.top = null;
        this.stackSize = 0;
    }
    LinkedListStack.prototype.push = function (item) {
        var newNode = new Node(item);
        newNode.next = this.top;
        this.top = newNode;
        this.stackSize++;
    };
    LinkedListStack.prototype.pop = function () {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        var poppedItem = this.top.data;
        this.top = this.top.next;
        this.stackSize--;
        return poppedItem;
    };
    LinkedListStack.prototype.peek = function () {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.top.data;
    };
    LinkedListStack.prototype.isEmpty = function () {
        return this.stackSize === 0;
    };
    LinkedListStack.prototype.size = function () {
        return this.stackSize;
    };
    LinkedListStack.prototype.clear = function () {
        this.top = null;
        this.stackSize = 0;
    };
    return LinkedListStack;
}());
exports.default = LinkedListStack;
