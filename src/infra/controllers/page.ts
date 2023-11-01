import { Request, Response } from "express";
import { Echo } from "../../../main";
import { GetLimitedLogsService } from "@app/services/getLimitedLogs.service";

export class PageController {
	constructor(private readonly getLimited: GetLimitedLogsService) {
		this.exec = this.exec.bind(this);
	}

	async exec(_: Request, res: Response) {
		const collection = await this.getLimited.exec({ start: 0, limit: 50 });
		res.render("index.ejs", { collection, appName: Echo.appName });
	}
}
