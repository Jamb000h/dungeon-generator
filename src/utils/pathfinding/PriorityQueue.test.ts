import { PriorityQueue } from "./PriorityQueue";

describe("PriorityQueue", () => {
  test("initializes as empty", () => {
    const PQ = new PriorityQueue();
    expect(PQ.isEmpty()).toBe(true);
  });

  test("can be added to and removed from", () => {
    const PQ = new PriorityQueue();
    PQ.push(0, 0, 0);
    expect(PQ.isEmpty()).toBe(false);
    expect(PQ.pop()).toEqual({ priority: 0, x: 0, y: 0 });
    expect(PQ.isEmpty()).toBe(true);
  });

  test("pops the smallest priority", () => {
    const PQ = new PriorityQueue();
    PQ.push(5, 5, 5);
    PQ.push(1, 1, 1);
    expect(PQ.pop()).toEqual({ priority: 1, x: 1, y: 1 });
  });

  test("push puts the new priority in correct position", () => {
    const PQ = new PriorityQueue();
    PQ.push(5, 5, 5);
    expect(PQ.getValues()).toEqual([{ priority: 5, x: 5, y: 5 }]);
    PQ.push(1, 1, 1);
    expect(PQ.getValues()).toEqual([
      { priority: 1, x: 1, y: 1 },
      { priority: 5, x: 5, y: 5 },
    ]);
    PQ.push(2, 2, 2);
    expect(PQ.getValues()).toEqual([
      { priority: 1, x: 1, y: 1 },
      { priority: 5, x: 5, y: 5 },
      { priority: 2, x: 2, y: 2 },
    ]);
  });

  test("pop puts the largest priority to correct position", () => {
    const PQ = new PriorityQueue();
    PQ.push(5, 5, 5);
    PQ.push(1, 1, 1);
    PQ.push(2, 2, 2);
    PQ.push(6, 6, 6);
    PQ.push(7, 7, 7);
    PQ.push(0, 0, 0);
    PQ.pop();
    expect(PQ.getValues()).toEqual([
      { priority: 1, x: 1, y: 1 },
      { priority: 5, x: 5, y: 5 },
      { priority: 2, x: 2, y: 2 },
      { priority: 6, x: 6, y: 6 },
      { priority: 7, x: 7, y: 7 },
    ]);
  });
});
