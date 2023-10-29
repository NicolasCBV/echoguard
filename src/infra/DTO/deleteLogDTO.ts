import { object, string } from "yup";

export class DeleteLogServiceDTO {
	static validate(input: any): { id: string; name: string } {
		const schema = object({
			id: string().required(),
			name: string().required(),
		});

		const data = schema.validateSync(input);
		return data;
	}
}
