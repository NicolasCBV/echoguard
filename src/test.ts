import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Echo } from "../main";

export async function bootstrap() {
	const app: NestExpressApplication =
		await NestFactory.create<NestExpressApplication>(AppModule);

	Echo.start({
		server: app,
		appName: "Dropneos",
		environment: {
			url: "redis://default:@localhost:6379",
			database: "REDIS",
		},
	});

	await app.listen(3000);
}

bootstrap();
