import { NestExpressApplication } from "@nestjs/platform-express";
import { resolve } from "path";
import * as express from "express";
import { lmdbRepo } from "@infra/storages/lmdb";
import { GetAllLogService } from "@app/services/getAllLog.service";
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

interface IStartProps {
	server: NestExpressApplication;
	appName: string;
}

export namespace Echo {
	export let appName = "[App Name]";

	const echoService = new EchoService();

	const createLog = new CreateLogService(lmdbRepo);
	const getAllLog = new GetAllLogService(lmdbRepo);
	const deleteLog = new DeleteLogService(lmdbRepo);
	const deleteAllLogs = new DeleteAllLogsService(lmdbRepo);

	const pageController = new PageController(getAllLog);
	const deleteLogController = new DeleteLogController(deleteLog);
	const deleteAllLogsController = new DeleteAllLogsController(deleteAllLogs);

	/**
	* Start the Echo Guard here
	* @param {IStartProps} input - Insert your server config here
	* @param {NestExpressApplication} input.server - Insert your server instance here (only express are accepted for now).
	* @param {string} input.appName - Put the name of your app here.
	**/
	export async function start(input: IStartProps) {
		appName = input.appName;

		const server = input.server.getHttpAdapter().getInstance();

		const regex = /^(.*echoguard).*$/gm;
		const actualDir = __dirname;
		const projectDir = actualDir.replace(regex, "$1");

		server.use(express.static(resolve(projectDir, "public")));
		server.use(express.json());
		server.set("view engine", "ejs");
		server.set("views", resolve(projectDir, "views"));

		server.get("/logs", pageController.exec);
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
