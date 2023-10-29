import { randomUUID } from "crypto";
import { TReplace } from "../../utils/replace";

export enum LogsLevelEnum {
	debug = "DEBUG",
	info = "INFO",
	warn = "WARNING",
	error = "ERROR",
	critical = "CRITICAL",
	alert = "ALERT",
	emergency = "EMERGENCY",
}

export interface ILogEntitieProps {
	name: string;
	description: string;
	layer?: string;
	level: LogsLevelEnum;
	createdAt: Date;
}

type TLogProps = TReplace<ILogEntitieProps, { createdAt?: Date }>;

export class LogEntitie {
	private readonly _id: string;
	private props: ILogEntitieProps;

	constructor(input: TLogProps, id?: string) {
		this._id = id ?? randomUUID();
		this.props = {
			...input,
			createdAt: input.createdAt ?? new Date(),
		};
	}

	public equalTo(input: LogEntitie) {
		return (
			input.name === this.props.name &&
			input.description === this.props.description &&
			input.createdAt === this.props.createdAt &&
			input.level === this.props.level &&
			input.layer === this.props.layer &&
			input.id === this._id
		);
	}

	// id
	get id(): string {
		return this._id;
	}

	// name
	get name(): string {
		return this.props.name;
	}

	set name(input: string) {
		this.props.name = input;
	}

	// description
	get description(): string {
		return this.props.description;
	}

	set description(input: string) {
		this.props.description = input;
	}

	// layer
	get layer(): string | undefined {
		return this.props.layer;
	}

	set layer(input: string | undefined) {
		this.props.layer = input;
	}

	// level
	get level(): LogsLevelEnum {
		return this.props.level;
	}

	set level(input: LogsLevelEnum) {
		this.props.level = input;
	}

	// createdAt
	get createdAt(): Date {
		return this.props.createdAt;
	}
}
