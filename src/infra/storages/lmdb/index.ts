import { LogEntitie } from "@app/entities/log";
import { LogMapper } from "@app/mapper/log";
import { RootDatabase, open } from "lmdb";
import { LogRepo } from "@app/repositories/logs";
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
			`${input.id}-${input.name.replaceAll(" ", "_")}`,
		);

		const logObject = LogMapper.toObject(input);
		await this.db.put(key, logObject);
	}

	async delete(key: string): Promise<void> {
		await this.db.remove(encodeURIComponent(key));
	}

	async getAll(): Promise<LogEntitie[]> {
		const rawLogs: LogEntitie[] = [];
		this.db.getRange({}).forEach(({ value }) => {
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

		return logs;
	}

	async deleteAll(): Promise<void> {
		await this.db.clearAsync();
	}
}

const lmdbRepo = new LMDBService();

export { lmdbRepo };
