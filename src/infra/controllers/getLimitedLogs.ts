import { GetLimitedLogsService } from "@app/services/getLimitedLogs.service";
import { GetLimitedLogsServiceDTO } from "@infra/DTO/getLimitedLogsDTO";
import { Request, Response } from "express";

export class GetLimitedController {
	constructor(private readonly getLimited: GetLimitedLogsService) {
		this.exec = this.exec.bind(this);
	}

	async exec(req: Request, res: Response) {
		const body = GetLimitedLogsServiceDTO.validate(req.body);
		const collection = await this.getLimited.exec(body);

		res.status(200).json(collection);
	}
}
