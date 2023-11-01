import { LogRepo } from "@app/repositories/logs";
import { LMDBService } from "./lmdb";
import { RedisRepo } from "./redis";

export type TPropsProductionLogStorage =
	| "LOCAL"
	| { database: "REDIS"; url: string };

export class ProductionLogStorage {
	database: LogRepo;

	constructor(environment?: TPropsProductionLogStorage) {
		if (environment === "LOCAL" || !environment)
			this.database = new LMDBService();
		else
			this.database = new RedisRepo(1000 * 60 * 60 * 12, environment.url);
	}

	getDB<T>() {
		return this.database as T;
	}
}
