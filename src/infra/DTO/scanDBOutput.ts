import { date, object, string } from "yup";

interface IExpectedLog {
	id: string;
	name: string;
	description: string;
	layer?: string;
	level: string;
	createdAt: Date;
}

export class ScanDBOutput {
	static expectForLog(input: any): IExpectedLog {
		const schema = object({
			id: string().required(),
			name: string().required(),
			description: string().required(),
			layer: string().optional(),
			level: string().required(),
			createdAt: date().required(),
		});

		const data = schema.validateSync(input);
		return data as IExpectedLog;
	}
}
