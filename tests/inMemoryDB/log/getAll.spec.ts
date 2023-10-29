import { logFactory } from "@tests/factories/log";
import { InMemoryLogDB } from ".";

describe("In Memory Log search test", () => {
	let sut: InMemoryLogDB;

	beforeEach(() => {
		sut = new InMemoryLogDB();
	});

	it("should be able to search for some log", async () => {
		const log = logFactory();

		await sut.create(log);
		expect((await sut.getAll()).length === 1).toBeTruthy();
	});
});
