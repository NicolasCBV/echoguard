import { EchoService } from "@app/services/logger.service";
import { Echo } from "../../main";
import { runRightLog } from "./convertLevelToEchoMethod";
describe("Convert Level To Echo Method", () => {
	it("should be able to convert", () => {
		const echoService = new EchoService();

		runRightLog(
			{
				name: "default",
				description: "default",
				level: Echo.LogsLevelEnum.debug,
			},
			echoService,
		);

		runRightLog(
			{
				name: "default",
				description: "default",
				level: Echo.LogsLevelEnum.info,
			},
			echoService,
		);

		runRightLog(
			{
				name: "default",
				description: "default",
				level: Echo.LogsLevelEnum.warn,
			},
			echoService,
		);

		runRightLog(
			{
				name: "default",
				description: "default",
				level: Echo.LogsLevelEnum.alert,
			},
			echoService,
		);

		runRightLog(
			{
				name: "default",
				description: "default",
				level: Echo.LogsLevelEnum.error,
			},
			echoService,
		);

		runRightLog(
			{
				name: "default",
				description: "default",
				level: Echo.LogsLevelEnum.critical,
			},
			echoService,
		);

		runRightLog(
			{
				name: "default",
				description: "default",
				level: Echo.LogsLevelEnum.emergency,
			},
			echoService,
		);
	});
});
