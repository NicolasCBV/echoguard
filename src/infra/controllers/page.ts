import { GetAllLogService } from "@app/services/getAllLog.service";
import { Request, Response } from "express";
import { Echo } from "../../../main";

export class PageController {
	constructor(private readonly getAllLogs: GetAllLogService) {
		this.exec = this.exec.bind(this);
	}

	async exec(_: Request, res: Response) {
		const logs = await this.getAllLogs.exec();
		res.render("index.ejs", { logs, appName: Echo.appName });
	}
}
