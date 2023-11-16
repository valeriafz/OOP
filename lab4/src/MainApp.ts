import ArrayStack from "./ArrayStack";
import LinkedListStack from "./LinkedListStack";
import ObjectStack from "./ObjectStack";

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
};
addElements(1, 2, 3, 4);

console.log("Array Stack Before Pop:", arrayStack);
arrayStack.pop();
console.log("Array Stack After Pop:", arrayStack);

console.log("Linked List Before Pop:", linkedListStack);
linkedListStack.pop();
console.log("Linked List After Pop:", linkedListStack);
console.log("Linked List Stack Peek:", linkedListStack.peek());

console.log("Object Stack Before Pop:", arrayStack);
objectStack.pop();
console.log("Object Stack After Pop:", arrayStack);
console.log("Object Stack Peek:", objectStack.peek());
