import * as request from "supertest";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Echo } from "../main";
import { Test } from "@nestjs/testing";
import { lmdbRepo } from "@infra/storages/lmdb";
import { logFactory } from "@tests/factories/log";

describe("Test Nest Application", () => {
	let app: NestExpressApplication;

	beforeEach(async () => {
		await lmdbRepo.deleteAll();

		const moduleRef = await Test.createTestingModule({}).compile();

		app = moduleRef.createNestApplication<NestExpressApplication>();

		Echo.start({ server: app, appName: "Test App" });
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to log page controller", async () => {
		const res = await request(app.getHttpServer()).get("/logs");

		expect(res.status === 200).toBeTruthy();
	});

	it("should be able to delete a log", async () => {
		const log = logFactory();
		await lmdbRepo.create(log);

		const registeredLog = (await lmdbRepo.getAll())[0];

		const res = await request(app.getHttpServer())
			.delete("/logs")
			.send({
				id: registeredLog.id,
				name: registeredLog.name,
			})
			.set("content-type", "application/json");

		expect(res.status === 204).toBeTruthy();
	});

	it("should be able to delete all logs", async () => {
		const log = logFactory();
		await lmdbRepo.create(log);

		const registeredLog = (await lmdbRepo.getAll())[0];

		const res = await request(app.getHttpServer())
			.delete("/logs/all")
			.send({
				id: registeredLog.id,
				name: registeredLog.name,
			})
			.set("content-type", "application/json");

		expect(res.status === 204).toBeTruthy();
	});
});
