import { LogEntitie } from "@app/entities/log";

export interface IGetLimitedProps {
	start: number;
	limit: number;
}

export interface IDeleteLog {
	name: string;
	id: string;
}

export interface IGetLimitedLogsReturn {
	logs: LogEntitie[];
	next: boolean;
}

export abstract class LogRepo {
	abstract create(input: LogEntitie): Promise<void>;

	abstract delete(input: IDeleteLog): Promise<void>;
	abstract deleteAll(): Promise<void>;

	abstract getLimited(
		input: IGetLimitedProps,
	): Promise<IGetLimitedLogsReturn>;
}
