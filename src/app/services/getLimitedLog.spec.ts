import { InMemoryLogDB } from "@tests/inMemoryDB/log";
import { logFactory } from "@tests/factories/log";
import { GetLimitedLogsService } from "./getLimitedLogs.service";

describe("Get limited logs service test", () => {
	let sut: GetLimitedLogsService;
	let logRepo: InMemoryLogDB;

	beforeEach(() => {
		logRepo = new InMemoryLogDB();
		sut = new GetLimitedLogsService(logRepo);
	});

	it("should be able to find a log", async () => {
		const log1 = logFactory();
		const log2 = logFactory({
			name: "I am equal",
		});
		const log3 = logFactory({
			name: "I am equal",
		});

		await logRepo.create(log1);
		await logRepo.create(log2);
		await logRepo.create(log3);

		const searchedLogs = await sut.exec({ start: 1, limit: 3 });
		expect(
			searchedLogs.logs[0].name === searchedLogs.logs[1].name,
		).toBeTruthy();
	});
});
