import { EchoService } from "@app/services/logger.service";
import { Echo } from "../../main";
import { UtilError } from "./error";

interface IProps {
	name: string;
	description: string;
	level: Echo.LogsLevelEnum;
}

export function runRightLog(log: IProps, echo: EchoService) {
	const message = `${log.name} - ${log.description}`;

	switch (log.level) {
	case Echo.LogsLevelEnum.warn:
		echo.warning(message);
		break;
	case Echo.LogsLevelEnum.info:
		echo.info(message);
		break;
	case Echo.LogsLevelEnum.debug:
		echo.debug(message);
		break;
	case Echo.LogsLevelEnum.emergency:
		echo.emergency(message);
		break;
	case Echo.LogsLevelEnum.critical:
		echo.critical(message);
		break;
	case Echo.LogsLevelEnum.error:
		echo.error(message);
		break;
	case Echo.LogsLevelEnum.alert:
		echo.alert(message);
		break;
	default:
		throw new UtilError({
			message: "Could not convert level to a valid method",
		});
	}
}
