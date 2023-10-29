import { ServiceError } from "./service";

describe("Service Error", () => {
	it("should be able to create a service error", () => {
		const error = new ServiceError({ message: "default" });
		expect((error.name = "Service Error")).toBeTruthy();
	});
});
