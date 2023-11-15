import StackInterface from "./StackInterface";

class ObjectStack<T> implements StackInterface<T> {
  private stack: { [key: number]: T } = {};
  private size: number = 0;

  push(item: T): void {
    this.stack[this.size] = item;
    this.size++;
  }

  pop(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const poppedItem = this.stack[this.size - 1];
    delete this.stack[this.size - 1];
    this.size--;
    return poppedItem!;
  }

  peek(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.stack[this.size - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  size(): number {
    return this.size;
  }

  clear(): void {
    this.stack = {};
    this.size = 0;
  }
}

export default ObjectStack;
