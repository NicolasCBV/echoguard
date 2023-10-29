import { logFactory } from "@tests/factories/log";

describe("Log entitie test", () => {
	it("should be able to create a log entitie", () => {
		const sut = logFactory();
		const newLog = sut;

		expect(sut.equalTo(newLog)).toBeTruthy();
	});
});
