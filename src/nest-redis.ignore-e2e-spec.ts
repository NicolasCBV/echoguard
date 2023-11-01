import * as request from "supertest";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Echo } from "../main";
import { Test } from "@nestjs/testing";
import { logFactory } from "@tests/factories/log";
import { ProductionLogStorage } from "@infra/storages/productionStorage";
import { RedisRepo } from "@infra/storages/redis";

describe("Test Nest Application [Redis]", () => {
	let app: NestExpressApplication;
	let repo: RedisRepo;

	beforeAll(async () => {
		const productionLogs = new ProductionLogStorage({
			url: "redis://default:@localhost:6379",
			database: "REDIS",
		});
		repo = productionLogs.getDB<RedisRepo>();

		await repo.deleteAll();

		const moduleRef = await Test.createTestingModule({}).compile();

		app = moduleRef.createNestApplication<NestExpressApplication>();

		Echo.start({
			server: app,
			appName: "Test App",
			environment: productionLogs,
		});
		await app.init();
	});

	beforeEach(async () => {
		await repo.deleteAll();
	});

	afterAll(async () => {
		await repo.quit();
		await app.close();
	});

	it("should be able to log page controller", async () => {
		const res = await request(app.getHttpServer()).get("/logs");

		expect(res.status === 200).toBeTruthy();
	});

	it("should be able to get range of logs", async () => {
		const log = logFactory();
		const log1 = logFactory(
			{
				name: "I am diferent",
			},
			"diferent id",
		);
		await repo.create(log);
		await repo.create(log1);

		const res = await request(app.getHttpServer())
			.post("/logs/limited")
			.send({
				start: 0,
				limit: 2,
			})
			.set("content-type", "application/json");

		expect(res.status === 200).toBeTruthy();

		const registeredLogs = (await repo.getLimited({ start: 0, limit: 2 }))
			.logs;
		expect(registeredLogs.length).toEqual(2);
	});

	it("should be able to delete a log", async () => {
		const log = logFactory();
		await repo.create(log);

		const registeredLog = (await repo.getLimited({ start: 0, limit: 1 }))
			.logs[0];

		const res = await request(app.getHttpServer())
			.delete("/logs")
			.send({
				id: registeredLog.id,
				name: registeredLog.name,
			})
			.set("content-type", "application/json");

		expect(res.status === 204).toBeTruthy();

		const validateRegisteredLogs = (
			await repo.getLimited({ start: 0, limit: 1 })
		).logs;
		expect(validateRegisteredLogs.length).toEqual(0);
	});

	it("should be able to delete all logs", async () => {
		const log = logFactory();
		const log1 = logFactory(
			{
				name: "I am diferent",
			},
			"diferent id",
		);
		await repo.create(log);
		await repo.create(log1);

		const registeredLog = (await repo.getLimited({ start: 0, limit: 2 }))
			.logs[0];

		const res = await request(app.getHttpServer())
			.delete("/logs/all")
			.send({
				id: registeredLog.id,
				name: registeredLog.name,
			})
			.set("content-type", "application/json");

		expect(res.status === 204).toBeTruthy();

		const validateRegisteredLogs = (
			await repo.getLimited({ start: 0, limit: 1 })
		).logs;
		expect(validateRegisteredLogs.length).toEqual(0);
	});
});
