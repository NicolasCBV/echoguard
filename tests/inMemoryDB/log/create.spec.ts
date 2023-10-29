import { logFactory } from "@tests/factories/log";
import { InMemoryLogDB } from ".";
import { InMemoryError } from "../error";
import { EntitiesEnum } from "@app/entities/entitiesEnum";

describe("In Memory Log creation test", () => {
	let sut: InMemoryLogDB;

	beforeEach(() => {
		sut = new InMemoryLogDB();
	});

	it("should be able to create some log", async () => {
		const log = logFactory();

		await sut.create(log);

		expect(sut.logs[0].equalTo(log)).toBeTruthy();
		expect(sut.create(log)).rejects.toThrowError(
			new InMemoryError({
				message: "Entitie already exist",
				entitie: EntitiesEnum.log,
			}),
		);
	});
});
