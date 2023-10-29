import { Echo } from "../../main";
import { UtilError } from "./error";

export function convertLogLevels(input: string) {
	switch (input) {
	case "DEBUG":
		return Echo.LogsLevelEnum.debug;
	case "INFO":
		return Echo.LogsLevelEnum.info;
	case "WARNING":
		return Echo.LogsLevelEnum.warn;
	case "ERROR":
		return Echo.LogsLevelEnum.error;
	case "CRITICAL":
		return Echo.LogsLevelEnum.critical;
	case "ALERT":
		return Echo.LogsLevelEnum.alert;
	case "EMERGENCY":
		return Echo.LogsLevelEnum.emergency;
	default:
		throw new UtilError({
			message: "Could not convert level to a valid enum",
		});
	}
}
