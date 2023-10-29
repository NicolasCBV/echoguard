import { ScanDBOutput } from "./scanDBOutput";

describe("Scan DB Output DTO Test", () => {
	it("should be able to validate", () => {
		const objt: {
			id?: string;
			name?: string;
			description?: string;
			layer?: string;
			level?: string;
			createdAt?: Date;
		} = {
			id: "default",
			name: "default",
			description: "default",
			layer: undefined,
			level: "level",
			createdAt: new Date(),
		};

		expect(ScanDBOutput.expectForLog(objt)).toBeTruthy();

		objt.layer = "default";
		expect(ScanDBOutput.expectForLog(objt)).toBeTruthy();

		objt.name = undefined;
		expect(() => ScanDBOutput.expectForLog(objt)).toThrow();

		objt.name = "default";
		objt.description = undefined;
		expect(() => ScanDBOutput.expectForLog(objt)).toThrow();

		objt.description = "default";
		objt.level = undefined;
		expect(() => ScanDBOutput.expectForLog(objt)).toThrow();

		objt.level = "default";
		objt.createdAt = undefined;
		expect(() => ScanDBOutput.expectForLog(objt)).toThrow();

		objt.createdAt = new Date();
		objt.id = undefined;
		expect(() => ScanDBOutput.expectForLog(objt)).toThrow();
	});
});
