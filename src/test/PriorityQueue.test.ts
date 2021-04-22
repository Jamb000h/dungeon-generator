import { PriorityQueue } from "../data-structures/PriorityQueue";

describe("PriorityQueue", () => {
  test("initializes as empty", () => {
    const queue = new PriorityQueue();
    expect(queue.isEmpty()).toBe(true);
  });

  test("can be added to and removed from", () => {
    const queue = new PriorityQueue();
    queue.push(0, 0, 0);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.pop()).toEqual({ priority: 0, x: 0, y: 0 });
    expect(queue.isEmpty()).toBe(true);
  });

  test("pops the smallest priority", () => {
    const queue = new PriorityQueue();
    queue.push(5, 5, 5);
    queue.push(1, 1, 1);
    expect(queue.pop()).toEqual({ priority: 1, x: 1, y: 1 });
  });

  test("push puts the new priority in correct position", () => {
    const queue = new PriorityQueue();
    queue.push(5, 5, 5);
    expect(queue.getValues()).toEqual([{ priority: 5, x: 5, y: 5 }]);
    queue.push(1, 1, 1);
    expect(queue.getValues()).toEqual([
      { priority: 1, x: 1, y: 1 },
      { priority: 5, x: 5, y: 5 },
    ]);
    queue.push(2, 2, 2);
    expect(queue.getValues()).toEqual([
      { priority: 1, x: 1, y: 1 },
      { priority: 5, x: 5, y: 5 },
      { priority: 2, x: 2, y: 2 },
    ]);
  });

  test("pop puts the largest priority to correct position", () => {
    const queue = new PriorityQueue();
    queue.push(5, 5, 5);
    queue.push(1, 1, 1);
    queue.push(2, 2, 2);
    queue.push(6, 6, 6);
    queue.push(7, 7, 7);
    queue.push(0, 0, 0);
    queue.pop();
    expect(queue.getValues()).toEqual([
      { priority: 1, x: 1, y: 1 },
      { priority: 5, x: 5, y: 5 },
      { priority: 2, x: 2, y: 2 },
      { priority: 6, x: 6, y: 6 },
      { priority: 7, x: 7, y: 7 },
    ]);
    queue.pop();
    expect(queue.getValues()).toEqual([
      { priority: 2, x: 2, y: 2 },
      { priority: 5, x: 5, y: 5 },
      { priority: 7, x: 7, y: 7 },
      { priority: 6, x: 6, y: 6 },
    ]);
  });
});
