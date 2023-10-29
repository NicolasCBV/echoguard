import { CreateLogService } from "@app/services/createLog.service";
import { DeleteLogService } from "@app/services/deleteLog.service";
import { GetAllLogService } from "@app/services/getAllLog.service";
import { lmdbRepo } from "@infra/storages/lmdb";
import { Echo } from "../../main";
import { DeleteAllLogsService } from "@app/services/deleteAllLogs.service";

describe("CRUD Log E2E Test", () => {
	let sut1Create: CreateLogService;
	let sut2GetAll: GetAllLogService;
	let sut3Delete: DeleteLogService;
	let sut4DeleteAll: DeleteAllLogsService;

	beforeEach(async () => {
		await lmdbRepo.deleteAll();

		sut1Create = new CreateLogService(lmdbRepo);
		sut2GetAll = new GetAllLogService(lmdbRepo);
		sut3Delete = new DeleteLogService(lmdbRepo);
		sut4DeleteAll = new DeleteAllLogsService(lmdbRepo);
	});

	it("should be able to make a CRUD of logs", async () => {
		const log = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "Some log",
		};

		const log1 = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "Some log",
		};

		const log2 = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "Some log",
		};

		await sut1Create.exec({ ...log });
		await sut1Create.exec({ ...log1 });
		await sut1Create.exec({ ...log2 });

		const searchedLog = (await sut2GetAll.exec())[0];

		expect(searchedLog.name === log.name).toBeTruthy();
		expect(searchedLog.layer === log.layer).toBeTruthy();
		expect(searchedLog.level === log.level).toBeTruthy();
		expect(searchedLog.description === log.description).toBeTruthy();

		expect(
			await sut3Delete.exec({
				key: `${searchedLog.id}-${log.name.replaceAll(" ", "_")}`,
			}),
		).resolves;
		expect((await sut2GetAll.exec()).length).toEqual(2);

		expect(await sut4DeleteAll.exec()).resolves;
		expect((await lmdbRepo.getAll()).length).toEqual(0);
	});
});
