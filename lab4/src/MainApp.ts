import ArrayStack from "./ArrayStack";
import LinkedListStack from "./LinkedListStack";
import ObjectStack from "./ObjectStack";

const arrayStack = new ArrayStack<number>();
arrayStack.push(1);
arrayStack.push(2);
arrayStack.push(3);
console.log(arrayStack.pop()); // 3
console.log(arrayStack.peek()); // 2

const linkedListStack = new LinkedListStack<number>();
linkedListStack.push(1);
linkedListStack.push(2);
linkedListStack.push(3);
console.log(linkedListStack.pop()); // 3
console.log(linkedListStack.peek()); // 2

const objectStack = new ObjectStack<number>();
objectStack.push(1);
objectStack.push(2);
objectStack.push(3);
console.log(objectStack.pop()); // 3
console.log(objectStack.peek()); // 2
