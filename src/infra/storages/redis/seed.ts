import { LogEntitie } from "@app/entities/log";
import { Echo } from "main";
import { RedisRepo } from ".";

function genSeed() {
	const redis = new RedisRepo(
		1000 * 60 * 60,
		"redis://default:@localhost:6379",
	);

	const log1 = new LogEntitie({
		name: "Could no't create user",
		description: "Can't create user because service failed on execution",
		layer: "Service",
		level: Echo.LogsLevelEnum.error,
	});

	const log2 = new LogEntitie({
		name: "Can't set \"CORS",
		description: "Can' define CORS because main function failed",
		layer: "Security",
		level: Echo.LogsLevelEnum.emergency,
	});

	const log3 = new LogEntitie({
		name: "Server is running",
		description: "Everything is good, everything is fine!",
		layer: "All",
		level: Echo.LogsLevelEnum.info,
	});

	const log4 = new LogEntitie({
		name: "Database is down",
		description:
			"Invalid `this.prisma.condominium.create()` invocation in /home/node/app/src/infra/storages/db/prisma/repositories/condominium.service.ts:20:33 17 input.condominium, 18 ); 19 → 20 await this.prisma.condominium.create( The table `public.condominiums` does not exist in the current database.",
		layer: "Database",
		level: Echo.LogsLevelEnum.critical,
	});

	const log5 = new LogEntitie({
		name: "HTTP protocol detected",
		description: "Server is running on insecure protocol!",
		layer: "Server",
		level: Echo.LogsLevelEnum.alert,
	});

	const log6 = new LogEntitie({
		name: "Running on port 3000",
		description: "Server is running on 3000 port",
		layer: "Server",
		level: Echo.LogsLevelEnum.debug,
	});

	const log7 = new LogEntitie({
		name: "Responses is taking too long",
		description: "Watch out, the responses is taking to long!",
		layer: "Server",
		level: Echo.LogsLevelEnum.warn,
	});

	const log8 = new LogEntitie({
		name: "Running on port 3000",
		description: "Server is running on 3000 port",
		layer: "Server",
		level: Echo.LogsLevelEnum.debug,
	});

	Promise.all([
		redis.create(log1),
		redis.create(log2),
		redis.create(log3),
		redis.create(log4),
		redis.create(log5),
		redis.create(log6),
		redis.create(log7),
		redis.create(log8),
	]);

	redis.quit();
}

genSeed();
