import ArrayStack from "./ArrayStack";
import LinkedListStack from "./LinkedListStack";
import ObjectStack from "./ObjectStack";

// Initialize stacks
const arrayStack = new ArrayStack<number>();
const linkedListStack = new LinkedListStack<number>();
const objectStack = new ObjectStack<number>();

const addElements = (...items: number[]) => {
  for (const item of items) {
    arrayStack.push(item);
    linkedListStack.push(item);
    objectStack.push(item);
  }
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
