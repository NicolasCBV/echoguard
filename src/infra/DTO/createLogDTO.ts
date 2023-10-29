import { ICreateLogServiceProps } from "@app/services/createLog.service";
import { object, string } from "yup";

export class CreateLogServiceDTO {
	static validate(input: any): ICreateLogServiceProps {
		const schema = object({
			name: string().required(),
			description: string().required(),
			layer: string().optional(),
			level: string().required(),
		});

		const data = schema.validateSync(input);
		return data as ICreateLogServiceProps;
	}
}
