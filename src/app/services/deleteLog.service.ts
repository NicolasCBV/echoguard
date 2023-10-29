import { LogRepo } from "@app/repositories/logs";

interface IProps {
	key: string;
}

export class DeleteLogService {
	constructor(private readonly logRepo: LogRepo) {}

	async exec(input: IProps) {
		await this.logRepo.delete(input.key);
	}
}
