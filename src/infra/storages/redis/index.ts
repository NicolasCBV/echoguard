import { LogEntitie } from "@app/entities/log";
import { LogMapper } from "@app/mapper/log";
import {
	IDeleteLog,
	IGetLimitedLogsReturn,
	IGetLimitedProps,
	LogRepo,
} from "@app/repositories/logs";
import Redis from "ioredis";

export class RedisRepo implements LogRepo {
	private readonly redis: Redis;

	constructor(
		private readonly ttlPerLog: number,
		url: string,
	) {
		this.redis = new Redis(url);
	}

	async quit() {
		await this.redis.quit();
	}

	async create(input: LogEntitie): Promise<void> {
		const log = LogMapper.toObject(input);
		const key = encodeURIComponent(
			`logs:${input.id}-${input.name.replaceAll(" ", "_")}`,
		);

		await this.redis.set(key, JSON.stringify(log), "PX", this.ttlPerLog);
	}

	async delete({ name, id }: IDeleteLog): Promise<void> {
		const parsedKey = encodeURIComponent(
			`logs:${id}-${name.replaceAll(" ", "_")}`,
		);
		await this.redis.del(parsedKey);
	}

	async deleteAll(): Promise<void> {
		const luaScript =
			"return redis.call('del', unpack(redis.call('keys', ARGV[1])))";
		const prefix = `${encodeURIComponent("logs")}*`;
		await this.redis.eval(luaScript, 0, prefix);
	}

	async getLimited(input: IGetLimitedProps): Promise<IGetLimitedLogsReturn> {
		const key = `${encodeURIComponent("logs:")}*`;
		const logs = await this.redis.scan(
			input.start,
			"MATCH",
			key,
			"COUNT",
			input.limit + 1,
		);
		const next = logs[1].length > 50 ? Boolean(logs[1].pop()) : false;

		const rawLogs = [];
		for await (const key of logs[1]) {
			const rawLog = await this.redis.get(key);
			if (!rawLog) break;

			const log = LogMapper.toClass(JSON.parse(rawLog));
			rawLogs.push(log);
		}

		const parsedLogs = rawLogs.sort((a, b) => {
			if (a.createdAt > b.createdAt) return -1;
			else if (a.createdAt < b.createdAt) return 1;
			else return 0;
		});

		return {
			logs: parsedLogs,
			next,
		};
	}
}
