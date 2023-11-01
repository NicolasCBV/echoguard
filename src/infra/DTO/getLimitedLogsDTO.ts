import { number, object } from "yup";

export class GetLimitedLogsServiceDTO {
	static validate(input: any): { start: number; limit: number } {
		const schema = object({
			limit: number().required(),
			start: number().required(),
		});

		const data = schema.validateSync(input);
		return data;
	}
}
