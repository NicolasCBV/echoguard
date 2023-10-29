import { DeleteAllLogsService } from "@app/services/deleteAllLogs.service";
import { Request, Response } from "express";

export class DeleteAllLogsController {
	constructor(private readonly deleteAllLogs: DeleteAllLogsService) {
		this.exec = this.exec.bind(this);
	}

	async exec(_: Request, res: Response) {
		await this.deleteAllLogs.exec();
		res.status(204).end();
	}
}
