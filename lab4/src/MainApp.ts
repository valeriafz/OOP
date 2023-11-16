import ArrayStack from "./ArrayStack";
import LinkedListStack from "./LinkedListStack";
import ObjectStack from "./ObjectStack";

const arrayStack = new ArrayStack<number>();
arrayStack.push(1);
arrayStack.push(2);
arrayStack.push(3);
console.log(`Your stack looks like this: ${arrayStack}`);
console.log(arrayStack.pop());
console.log(arrayStack.peek());

const linkedListStack = new LinkedListStack<number>();
linkedListStack.push(4);
linkedListStack.push(5);
linkedListStack.push(6);
console.log(linkedListStack.pop());
console.log(linkedListStack.peek());

const objectStack = new ObjectStack<number>();
objectStack.push(7);
objectStack.push(8);
objectStack.push(9);
console.log(objectStack.pop());
console.log(objectStack.peek());
