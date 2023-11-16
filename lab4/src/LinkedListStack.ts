import StackInterface from "./StackInterface";

class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListStack<T> implements StackInterface<T> {
  private top: Node<T> | null = null;
  private stackSize: number = 0;

  push(item: T): void {
    const newNode = new Node(item);
    newNode.next = this.top;
    this.top = newNode;
    this.stackSize++;
  }

  pop(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const poppedItem = this.top!.data;
    this.top = this.top!.next;
    this.stackSize--;
    return poppedItem;
  }

  peek(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.top!.data;
  }

  isEmpty(): boolean {
    return this.stackSize === 0;
  }

  size(): number {
    return this.stackSize;
  }

  clear(): void {
    this.top = null;
    this.stackSize = 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.top;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

export default LinkedListStack;
