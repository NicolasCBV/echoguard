import { logFactory } from "@tests/factories/log";
import { LogMapper } from "./log";

describe("Log Mapper Test", () => {
	it("should be able to convert", () => {
		const sut1 = logFactory();
		const sut2 = LogMapper.toObject(sut1);
		const sut3 = LogMapper.toClass(sut2);

		expect(sut3.equalTo(sut1)).toBeTruthy();
	});
});
