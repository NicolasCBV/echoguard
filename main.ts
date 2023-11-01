import { NestExpressApplication } from "@nestjs/platform-express";
import { resolve } from "path";
import * as express from "express";
import { DeleteLogService } from "@app/services/deleteLog.service";
import {
	CreateLogService,
	ICreateLogServiceProps,
} from "@app/services/createLog.service";
import { CreateLogServiceDTO } from "@infra/DTO/createLogDTO";
import { PageController } from "@infra/controllers/page";
import { DeleteLogController } from "@infra/controllers/deleteLog";
import { DeleteAllLogsService } from "@app/services/deleteAllLogs.service";
import { DeleteAllLogsController } from "@infra/controllers/deleteAllLogs";
import { EchoService } from "@app/services/logger.service";
import { runRightLog } from "@utils/convertLevelToEchoMethod";
import { GetLimitedController } from "@infra/controllers/getLimitedLogs";
import { GetLimitedLogsService } from "@app/services/getLimitedLogs.service";
import { InMemoryLogDB } from "@tests/inMemoryDB/log";
import { ProductionLogStorage, TPropsProductionLogStorage } from "@infra/storages/productionStorage";
import { LogRepo } from "@app/repositories/logs";

interface IStartProps {
	server: NestExpressApplication;
	appName: string;
	environment?: TPropsProductionLogStorage | ProductionLogStorage;
}

export namespace Echo {
	export let appName = "[App Name]";
	let isStarted = false;

	const echoService = new EchoService();

	let createLog: CreateLogService;
	let deleteLog: DeleteLogService;
	let deleteAllLogs: DeleteAllLogsService;
	let getLimitedLogs: GetLimitedLogsService;

	let limitedLogsController: GetLimitedController;
	let deleteLogController: DeleteLogController;
	let deleteAllLogsController: DeleteAllLogsController;
	let pageController: PageController;

	function setEnv(cache: LogRepo) {
		createLog = new CreateLogService(cache);
		deleteLog = new DeleteLogService(cache);
		deleteAllLogs = new DeleteAllLogsService(cache);
		getLimitedLogs = new GetLimitedLogsService(cache);

		limitedLogsController = new GetLimitedController(getLimitedLogs);
		deleteLogController = new DeleteLogController(deleteLog);
		deleteAllLogsController = new DeleteAllLogsController(deleteAllLogs);
		pageController = new PageController(getLimitedLogs);
	}

	export let serverInstance: NestExpressApplication;
	/**
	* Start the Echo Guard here. Only use this if you want save your logs on your machine
	* @param {IStartProps} input - Insert your server config here
	* @param {NestExpressApplication} input.server - Insert your server instance here (only express are accepted for now).
	* @param {string} input.appName - Put the name of your app here.
	* @param {TPropsProductionLogStorage | ProductionLogStorage} [input.environment] - define where the echoguard will run.
	**/
	export async function start(input: IStartProps) {
		appName = input.appName;
		isStarted = true;

		let cache: LogRepo;

		if(input.environment instanceof ProductionLogStorage)
			cache = input.environment.database;
		else
			cache = process.env.NODE_ENV !== 'test' 
				? new ProductionLogStorage(input.environment).database 
				: new InMemoryLogDB();


		setEnv(cache);


		serverInstance = input.server;
		const server = input.server.getHttpAdapter().getInstance();

		const regex = /^(.*echoguard).*$/gm;
		const actualDir = __dirname;
		const projectDir = actualDir.replace(regex, "$1");

		server.use(express.static(resolve(projectDir, "public")));
		server.use(express.json());
		server.set("view engine", "ejs");
		server.set("views", resolve(projectDir, "views"));
		
		server.get("/logs", pageController.exec);

		server.post('/logs/limited', limitedLogsController.exec);
		server.delete("/logs", deleteLogController.exec);
		server.delete("/logs/all", deleteAllLogsController.exec);
	}

	/**
	* Use this function to create your log.
	* @param {ICreateLogServiceProps} input - Used to insert your log definitions
	* @param {string} input.name - Name of your log
	* @param {string} [input.layer] - Were your log was used?
	* @param {LogsLevelEnum} input.level - Set the type of your log
	* @param {string} input.description - Set the description of your log
	**/
	export async function create(input: ICreateLogServiceProps) {
		const data = CreateLogServiceDTO.validate(input);

		runRightLog(
			{
				name: input.name,
				description: input.description,
				level: input.level,
			},
			echoService,
		);

		if(isStarted)
			await createLog.exec(data);
	}

	/**
	* Enum used to define the type of your log
	**/
	export enum LogsLevelEnum {
		debug = "DEBUG",
		info = "INFO",
		warn = "WARNING",
		error = "ERROR",
		critical = "CRITICAL",
		alert = "ALERT",
		emergency = "EMERGENCY",
	}
}
