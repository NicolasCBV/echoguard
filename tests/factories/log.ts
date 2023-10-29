import { ILogEntitieProps, LogEntitie } from "@app/entities/log";
import { LogsLevelEnum } from "@app/entities/log";

type TOverride = Partial<ILogEntitieProps>;

export function logFactory(input: TOverride = {}, id?: string) {
	return new LogEntitie(
		{
			layer: "unknown",
			level: LogsLevelEnum.info,
			description: "Some description",
			createdAt: new Date(),
			name: "Some log",
			...input,
		},
		id,
	);
}
