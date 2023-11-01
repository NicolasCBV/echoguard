import { GetLimitedLogsServiceDTO } from "./getLimitedLogsDTO";

describe("Limited Logs Service DTO Test", () => {
	it("should be able to validate", () => {
		const objt: {
			start?: number;
			limit?: number;
		} = {
			start: 0,
			limit: 1,
		};

		expect(GetLimitedLogsServiceDTO.validate(objt)).toBeTruthy();

		objt.start = undefined;
		expect(() => GetLimitedLogsServiceDTO.validate(objt)).toThrow();

		objt.start = 0;
		objt.limit = undefined;
		expect(() => GetLimitedLogsServiceDTO.validate(objt)).toThrow();
	});
});
