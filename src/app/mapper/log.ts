import { LogEntitie, LogsLevelEnum } from "@app/entities/log";

export interface ILogOutputObjectMapperProps {
	id: string;
	name: string;
	description: string;
	layer?: string;
	level: LogsLevelEnum;
	createdAt: Date;
}

export interface ILogInputObjectMapperProps {
	id?: string;
	name: string;
	description: string;
	layer?: string;
	level: LogsLevelEnum;
	createdAt?: Date;
}

export class LogMapper {
	static toObject(input: LogEntitie): ILogOutputObjectMapperProps {
		return {
			id: input.id,
			name: input.name,
			description: input.description,
			layer: input.layer,
			level: input.level,
			createdAt: input.createdAt,
		};
	}

	static toClass(input: ILogInputObjectMapperProps): LogEntitie {
		return new LogEntitie(
			{
				name: input.name,
				description: input.description,
				layer: input.layer,
				level: input.level,
				createdAt: input.createdAt,
			},
			input.id,
		);
	}
}
