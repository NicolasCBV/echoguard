import { LogEntitie } from "@app/entities/log";
import { LogMapper } from "@app/mapper/log";
import { RootDatabase, open } from "lmdb";
import {
	IDeleteLog,
	IGetLimitedLogsReturn,
	IGetLimitedProps,
	LogRepo,
} from "@app/repositories/logs";
import { ScanDBOutput } from "@infra/DTO/scanDBOutput";
import { convertLogLevels } from "@utils/convertLogLevels";

export class LMDBService implements LogRepo {
	private readonly db: RootDatabase;

	constructor() {
		const path = process.env.NODE_ENV === "test" ? "log.test.db" : "log.db";

		this.db = open({
			path,
			compression: true,
		});
	}

	async create(input: LogEntitie): Promise<void> {
		const key = encodeURIComponent(
			`logs:${input.id}-${input.name.replaceAll(" ", "_")}`,
		);

		const logObject = LogMapper.toObject(input);
		await this.db.put(key, logObject);
	}

	async delete({ name, id }: IDeleteLog): Promise<void> {
		const parsedKey = encodeURIComponent(
			`logs:${id}-${name.replaceAll(" ", "_")}`,
		);
		await this.db.remove(encodeURIComponent(parsedKey));
	}

	async deleteAll(): Promise<void> {
		await this.db.clearAsync();
	}

	async getLimited(input: IGetLimitedProps): Promise<IGetLimitedLogsReturn> {
		const rawLogs: LogEntitie[] = [];
		this.db
			.getRange({ start: 0, limit: input.limit })
			.forEach(({ value }) => {
				const rawLog = ScanDBOutput.expectForLog(value);
				const parsedLog = LogMapper.toClass({
					...rawLog,
					level: convertLogLevels(rawLog.level),
				});

				rawLogs.push(parsedLog);
			});

		const logs = rawLogs.sort((a, b) => {
			if (a.createdAt > b.createdAt) return -1;
			else if (a.createdAt < b.createdAt) return 1;
			else return 0;
		});

		const next = logs.length > 50 ? Boolean(logs.pop()) : false;

		return { logs, next };
	}
}
