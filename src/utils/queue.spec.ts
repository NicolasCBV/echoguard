import { Queue } from "./queue";

describe("Queue test", () => {
	it("should be able to create a queue", () => {
		const dateStack = new Queue<Date>();
		const now = new Date();
		const before = new Date(Date.now() - 10000);

		dateStack.push(now);
		dateStack.push(before);

		expect(dateStack.peek() > before).toBeTruthy();

		dateStack.pop();

		expect(dateStack.peek() === now).toBeTruthy();
	});
});
