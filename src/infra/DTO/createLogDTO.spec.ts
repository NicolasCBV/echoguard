import { CreateLogServiceDTO } from "./createLogDTO";

describe("Create Log Service DTO Test", () => {
	it("should be able to validate", () => {
		const objt: {
			name?: string;
			description?: string;
			layer?: string;
			level?: string;
		} = {
			name: "default",
			description: "default",
			layer: undefined,
			level: "level",
		};

		expect(CreateLogServiceDTO.validate(objt)).toBeTruthy();

		objt.layer = "default";
		expect(CreateLogServiceDTO.validate(objt)).toBeTruthy();

		objt.name = undefined;
		expect(() => CreateLogServiceDTO.validate(objt)).toThrow();

		objt.name = "default";
		objt.description = undefined;
		expect(() => CreateLogServiceDTO.validate(objt)).toThrow();

		objt.description = "default";
		objt.level = undefined;
		expect(() => CreateLogServiceDTO.validate(objt)).toThrow();
	});
});
