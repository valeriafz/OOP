import StackInterface from "./StackInterface";

class ObjectStack<T> implements StackInterface<T> {
  private stack: { [key: number]: T } = {};
  private stackSize: number = 0;

  push(item: T): void {
    this.stack[this.stackSize] = item;
    this.stackSize++;
  }

  pop(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const poppedItem = this.stack[this.stackSize - 1];
    delete this.stack[this.stackSize - 1];
    this.stackSize--;
    return poppedItem!;
  }

  peek(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.stack[this.stackSize - 1];
  }

  isEmpty(): boolean {
    return this.stackSize === 0;
  }

  size(): number {
    return this.stackSize;
  }

  clear(): void {
    this.stack = {};
    this.stackSize = 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.stackSize; i++) {
      result.push(this.stack[i]);
    }
    return result;
  }
}

export default ObjectStack;
