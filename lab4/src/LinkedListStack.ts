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
  private size: number = 0;

  push(item: T): void {
    const newNode = new Node(item);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const poppedItem = this.top!.data;
    this.top = this.top!.next;
    this.size--;
    return poppedItem;
  }

  peek(): T | string {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.top!.data;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  size(): number {
    return this.size;
  }

  clear(): void {
    this.top = null;
    this.size = 0;
  }
}

export default LinkedListStack;
