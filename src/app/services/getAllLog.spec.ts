import { InMemoryLogDB } from "@tests/inMemoryDB/log";
import { logFactory } from "@tests/factories/log";
import { GetAllLogService } from "./getAllLog.service";

describe("Get all log service test", () => {
	let sut: GetAllLogService;
	let logRepo: InMemoryLogDB;

	beforeEach(() => {
		logRepo = new InMemoryLogDB();
		sut = new GetAllLogService(logRepo);
	});

	it("should be able to find a log", async () => {
		const log = logFactory();

		await logRepo.create(log);
		expect((await sut.exec()).length === 1).toBeTruthy();
	});
});
