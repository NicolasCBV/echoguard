import { InMemoryLogDB } from "@tests/inMemoryDB/log";
import { logFactory } from "@tests/factories/log";
import { DeleteLogService } from "./deleteLog.service";

describe("Delete log service test", () => {
	let sut: DeleteLogService;
	let logRepo: InMemoryLogDB;

	beforeEach(() => {
		logRepo = new InMemoryLogDB();
		sut = new DeleteLogService(logRepo);
	});

	it("should be able to delete a log", async () => {
		const log = logFactory();
		await logRepo.create(log);
		expect(sut.exec({ name: log.name, id: log.id })).resolves;
	});
});
