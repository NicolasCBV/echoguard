import { DeleteLogServiceDTO } from "./deleteLogDTO";

describe("Delete Log Service DTO Test", () => {
	it("should be able to validate", () => {
		const objt: {
			id?: string;
			name?: string;
		} = {
			id: "default",
			name: "default",
		};

		expect(DeleteLogServiceDTO.validate(objt)).toBeTruthy();

		objt.id = undefined;
		expect(() => DeleteLogServiceDTO.validate(objt)).toThrow();

		objt.id = "default";
		objt.name = undefined;
		expect(() => DeleteLogServiceDTO.validate(objt)).toThrow();
	});
});
