import { LMDBLogicError } from "./lmdb";

describe("LMDB Logic Error", () => {
	it("should be able to create a LMDB Logic error", () => {
		const error = new LMDBLogicError({ message: "default" });
		expect((error.name = "LMDB Logic Error")).toBeTruthy();
	});
});
