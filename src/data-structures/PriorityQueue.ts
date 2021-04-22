interface Node {
  x: number;
  y: number;
  priority: number;
}

export class PriorityQueue {
  private values: Node[];

  /**
   * Creates a new minimum priority queue. Smallest priority on top.
   */
  constructor() {
    this.values = [];
  }

  /**
   * Adds a node to queue
   * @param x x-coordinate
   * @param y y-coordinate
   * @param priority priority
   */
  push(x: number, y: number, priority: number) {
    // Add to queue
    this.values.push({ x, y, priority });

    // Move up in the queue until correctly positioned
    this.moveUp();
  }

  /**
   * Returns the smallest node in the queue
   * @return {object} the smallest node in the queue
   */
  pop(): Node {
    // Get smallest node
    const smallest = { ...this.values[0] };
    // Get largest index
    const bottomIndex = this.values.length - 1;

    // Switch smallest node and largest node
    this.swap(0, bottomIndex);
    // Remove smallest node
    this.values.pop();

    // Move largest node to correct position
    this.moveDown();

    return smallest;
  }

  /**
   * Moves the last value of the queue until it is in correct position
   */
  private moveUp() {
    let index = this.values.length - 1;
    // As long as current node is has a smaller priority than the parent, swap with parent
    // and stop if the current node becomes the first one
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.values[parentIndex];
      const current = this.values[index];

      // We want to swap if parent has a larger priority
      if (parent.priority > current.priority) {
        this.values[parentIndex] = current;
        this.values[index] = parent;
        index = parentIndex;
      } else break;
    }
  }

  /**
   * Moves the first node of the queue until it is in correct position
   */
  private moveDown() {
    // Start at the first value
    let currentIndex = 0;
    let smallestIndex = 0;
    while (true) {
      // Get indices for potential children
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;

      if (
        leftChildIndex < this.values.length &&
        this.values[leftChildIndex].priority <
          this.values[smallestIndex].priority
      ) {
        // Assuming we found a left child and the left child has a smaller priority than our current
        // smallest priority, we set that the current smallest is the left child
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.values.length &&
        this.values[rightChildIndex].priority <
          this.values[smallestIndex].priority
      ) {
        // Assuming we found a right child and the right child has a smaller priority than our current
        // smallest priority, we set that the current smallest is the right child
        smallestIndex = rightChildIndex;
      }

      if (currentIndex !== smallestIndex) {
        // If we found a new smaller value, swap values
        this.swap(currentIndex, smallestIndex);
        currentIndex = smallestIndex;
      } else {
        // Otherwise the current value is in correct position
        break;
      }
    }
  }

  /**
   * Swaps values in two nodes
   * @param i index of value 1
   * @param j index of value 2
   */
  private swap(i: number, j: number) {
    const temp = { ...this.values[i] };
    this.values[i] = { ...this.values[j] };
    this.values[j] = { ...temp };
  }

  /**
   * Return information whether the queue is empty
   * @return true if empty, false otherwise
   */
  isEmpty() {
    return this.values.length === 0;
  }

  getValues() {
    return this.values;
  }
}
