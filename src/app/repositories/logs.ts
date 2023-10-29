import { LogEntitie } from "@app/entities/log";

export abstract class LogRepo {
	abstract create(input: LogEntitie): Promise<void>;
	abstract delete(key: string): Promise<void>;
	abstract deleteAll(): Promise<void>;
	abstract getAll(): Promise<LogEntitie[]>;
}
