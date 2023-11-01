import { LogRepo } from "@app/repositories/logs";

interface IProps {
	name: string;
	id: string;
}

export class DeleteLogService {
	constructor(private readonly logRepo: LogRepo) {}

	async exec(input: IProps) {
		await this.logRepo.delete(input);
	}
}
