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

	it("should be able to create logs", async () => {
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
	});

	it("should be able to get range of logs", async () => {
		const log = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "I am equal",
		};

		const log1 = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "I am equal",
		};

		await sut1Create.exec({ ...log });
		await sut1Create.exec({ ...log1 });

		const searchedLogs = await sut2GetLimitedLogs.exec({
			start: 1,
			limit: 2,
		});
		expect(searchedLogs.logs.length).toEqual(2);
		expect(
			searchedLogs.logs[0].name === searchedLogs.logs[1].name,
		).toBeTruthy();
	});

	it("should be able to delete a log", async () => {
		const log = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "I am equal",
		};
		await sut1Create.exec({ ...log });
		const searchedLogs = (
			await sut2GetLimitedLogs.exec({
				start: 1,
				limit: 1,
			})
		).logs;

		await sut3Delete.exec({
			name: searchedLogs[0].name,
			id: searchedLogs[0].id,
		});

		const validateSearchedLogs = await sut2GetLimitedLogs.exec({
			start: 0,
			limit: 1,
		});
		expect(validateSearchedLogs.logs.length).toEqual(0);
	});

	it("should be able to delete many", async () => {
		const log = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "I am equal",
		};

		const log1 = {
			layer: "unknown",
			level: Echo.LogsLevelEnum.info,
			description: "Some description",
			name: "I am equal",
		};

		await sut1Create.exec({ ...log });
		await sut1Create.exec({ ...log1 });

		expect(await sut4DeleteAll.exec()).resolves;

		const checkSearchedLogs = await sut2GetLimitedLogs.exec({
			start: 0,
			limit: 2,
		});
		expect(checkSearchedLogs.logs.length).toEqual(0);
	});
});
