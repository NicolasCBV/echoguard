import { UtilError } from "./error";

describe("Util Error Test", () => {
	it("should be able to create a error util", () => {
		const error = new UtilError({ message: "default" });
		expect(error.name === "Util Error").toBeTruthy();
	});
});
