import { InMemoryLogDB } from "@tests/inMemoryDB/log";
import { logFactory } from "@tests/factories/log";
import { DeleteAllLogsService } from "./deleteAllLogs.service";

describe("Delete all logs service test", () => {
	let sut: DeleteAllLogsService;
	let logRepo: InMemoryLogDB;

	beforeEach(() => {
		logRepo = new InMemoryLogDB();
		sut = new DeleteAllLogsService(logRepo);
	});

	it("should be able to delete a log", async () => {
		const log = logFactory();
		await logRepo.create(log);
		expect(sut.exec()).resolves;
	});
});
