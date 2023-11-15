interface StackInterface<T> {
  push(item: T): void;
  pop(): T | string;
  peek(): T | string;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}
export default StackInterface;
