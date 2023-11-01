import { logFactory } from "@tests/factories/log";
import { InMemoryLogDB } from ".";

describe("In Memory Log get certain number of logs test", () => {
	let sut: InMemoryLogDB;

	beforeEach(() => {
		sut = new InMemoryLogDB();
	});

	it("should be able to get logs", async () => {
		const log1 = logFactory({
			name: "I am diferent",
		});
		const log2 = logFactory({
			name: "I am equal",
		});
		const log3 = logFactory({
			name: "I am equal",
		});

		await sut.create(log1);
		await sut.create(log2);
		await sut.create(log3);

		const searchedLogs = await sut.getLimited({ start: 1, limit: 2 });
		expect(
			searchedLogs.logs[0].name === searchedLogs.logs[1].name,
		).toBeTruthy();
	});
});
