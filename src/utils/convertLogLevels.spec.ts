import { Echo } from "../../main";
import { convertLogLevels } from "./convertLogLevels";

describe("Convert Log Levels Test", () => {
	it("should be able to convert", () => {
		const debug = convertLogLevels("DEBUG");
		expect(debug === Echo.LogsLevelEnum.debug);

		const info = convertLogLevels("INFO");
		expect(info === Echo.LogsLevelEnum.info);

		const warn = convertLogLevels("WARNING");
		expect(warn === Echo.LogsLevelEnum.warn);

		const error = convertLogLevels("ERROR");
		expect(error === Echo.LogsLevelEnum.error);

		const critical = convertLogLevels("CRITICAL");
		expect(critical === Echo.LogsLevelEnum.critical);

		const alert = convertLogLevels("ALERT");
		expect(alert === Echo.LogsLevelEnum.alert);

		const emergency = convertLogLevels("EMERGENCY");
		expect(emergency === Echo.LogsLevelEnum.emergency);
	});
});
