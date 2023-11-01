import { logFactory } from "@tests/factories/log";
import { LogsLevelEnum } from "./log";

describe("Log entitie test", () => {
	it("should be able to create a log entitie", () => {
		const sut = logFactory();
		const newLog = sut;

		expect(sut.equalTo(newLog)).toBeTruthy();

		sut.name = "new name";
		expect(sut.name === "new name").toBeTruthy();

		sut.description = "new description";
		expect(sut.description === "new description").toBeTruthy();

		sut.level = LogsLevelEnum.warn;
		expect(sut.level === LogsLevelEnum.warn).toBeTruthy();

		sut.layer = "new layer";
		expect(sut.layer === "new layer").toBeTruthy();
	});
});
