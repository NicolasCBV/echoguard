import { DeleteLogService } from "@app/services/deleteLog.service";
import { DeleteLogServiceDTO } from "@infra/DTO/deleteLogDTO";
import { Request, Response } from "express";

export class DeleteLogController {
	constructor(private readonly deleteLog: DeleteLogService) {
		this.exec = this.exec.bind(this);
	}

	async exec(req: Request, res: Response) {
		const body = DeleteLogServiceDTO.validate(req.body);
		await this.deleteLog.exec(body);

		res.status(204).end();
	}
}
