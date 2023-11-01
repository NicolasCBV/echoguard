import { LogMapper } from "@app/mapper/log";
import { LogRepo } from "@app/repositories/logs";

interface IProps {
	start: number;
	limit: number;
}

export class GetLimitedLogsService {
	constructor(private readonly logRepo: LogRepo) {}

	async exec(input: IProps) {
		const res = await this.logRepo.getLimited(input);
		const logs = res.logs.map((item) => LogMapper.toObject(item));

		return {
			logs,
			next: res.next,
		};
	}
}
