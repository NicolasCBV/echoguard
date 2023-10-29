import { DeleteLogService } from "@app/services/deleteLog.service";
import { DeleteLogServiceDTO } from "@infra/DTO/deleteLogDTO";
import { Request, Response } from "express";

export class DeleteLogController {
	constructor(private readonly deleteLog: DeleteLogService) {
		this.exec = this.exec.bind(this);
	}

	async exec(req: Request, res: Response) {
		const body = DeleteLogServiceDTO.validate(req.body);
		const key = `${body.id}-${body.name.replaceAll(" ", "_")}`;
		await this.deleteLog.exec({ key });

		res.status(204).end();
	}
}
