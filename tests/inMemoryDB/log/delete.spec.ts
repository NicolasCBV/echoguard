import { logFactory } from "@tests/factories/log";
import { InMemoryLogDB } from ".";
import { InMemoryError } from "../error";
import { EntitiesEnum } from "@app/entities/entitiesEnum";

describe("In Memory Log delete test", () => {
	let sut: InMemoryLogDB;

	beforeEach(() => {
		sut = new InMemoryLogDB();
	});

	it("should be able to delete some log", async () => {
		const log = logFactory();

		expect(sut.create(log)).toBeTruthy();
		expect(sut.delete({ name: log.name, id: log.id })).toBeTruthy();
	});

	it("should throw one error - 'Entitie doesn't exist'", async () => {
		const log = logFactory();

		expect(sut.delete({ name: log.name, id: log.id })).rejects.toThrowError(
			new InMemoryError({
				message: "Entitie doesn't exist",
				entitie: EntitiesEnum.log,
			}),
		);
	});
});
