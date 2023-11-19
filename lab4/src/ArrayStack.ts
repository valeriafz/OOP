import StackInterface from "./StackInterface";

class ArrayStack<T> implements StackInterface<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop()!;
  }

  peek(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

export default ArrayStack;
