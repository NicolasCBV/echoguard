import { logFactory } from "@tests/factories/log";
import { InMemoryLogDB } from ".";

describe("In Memory Log delete all test", () => {
	let sut: InMemoryLogDB;

	beforeEach(() => {
		sut = new InMemoryLogDB();
	});

	it("should be able to delete all logs", async () => {
		const log = logFactory();

		expect(sut.create(log)).toBeTruthy();
		expect(sut.deleteAll()).toBeTruthy();
	});
});
