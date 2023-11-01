import { CreateLogService } from "@app/services/createLog.service";
import { DeleteLogService } from "@app/services/deleteLog.service";
import { ProductionLogStorage } from "@infra/storages/productionStorage";
import { Echo } from "../../main";
import { DeleteAllLogsService } from "@app/services/deleteAllLogs.service";
import { GetLimitedLogsService } from "@app/services/getLimitedLogs.service";

describe("CRUD Log E2E Test", () => {
	let sut1Create: CreateLogService;
	let sut2GetLimitedLogs: GetLimitedLogsService;
	let sut3Delete: DeleteLogService;
	let sut4DeleteAll: DeleteAllLogsService;

	beforeEach(async () => {
		const repo = new ProductionLogStorage().database;

		await repo.deleteAll();

		sut1Create = new CreateLogService(repo);
		sut2GetLimitedLogs = new GetLimitedLogsService(repo);
		sut3Delete = new DeleteLogService(repo);
		sut4DeleteAll = new DeleteAllLogsService(repo);
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
			name: "I am equal",
		};

		const log2 = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "I am equal",
		};

		await sut1Create.exec({ ...log });
		await sut1Create.exec({ ...log1 });
		await sut1Create.exec({ ...log2 });

		const searchedLogs = await sut2GetLimitedLogs.exec({
			start: 1,
			limit: 3,
		});
		expect(searchedLogs.logs.length).toEqual(3);
		expect(
			searchedLogs.logs[0].name === searchedLogs.logs[1].name,
		).toBeTruthy();

		expect(
			await sut3Delete.exec({
				id: searchedLogs.logs[0].id,
				name: searchedLogs.logs[0].name,
			}),
		).resolves;

		const checkSearchedLogs = await sut2GetLimitedLogs.exec({
			start: 0,
			limit: 3,
		});
		expect(checkSearchedLogs.logs.length).toEqual(2);
		expect(
			checkSearchedLogs.logs[0].name !== checkSearchedLogs.logs[1].name,
		).toBeTruthy();

		expect(await sut4DeleteAll.exec()).resolves;
		expect(
			(await sut2GetLimitedLogs.exec({ start: 0, limit: 3 })).logs.length,
		).toEqual(0);
	});
});
