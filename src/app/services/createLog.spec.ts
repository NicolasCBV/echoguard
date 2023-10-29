import { InMemoryLogDB } from "@tests/inMemoryDB/log";
import { CreateLogService } from "./createLog.service";
import { logFactory } from "@tests/factories/log";

describe("Create log service test", () => {
	let sut: CreateLogService;
	let logRepo: InMemoryLogDB;

	beforeEach(() => {
		logRepo = new InMemoryLogDB();
		sut = new CreateLogService(logRepo);
	});

	it("should be able to create a log", async () => {
		const log = logFactory();
		await sut.exec({
			level: log.level,
			description: log.description,
			layer: log.layer,
			name: log.name,
		});

		expect(logRepo.logs[0]).toBeTruthy();
	});
});
