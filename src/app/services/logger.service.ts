import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from "node:process";

export class EchoService {
	private getDate() {
		const date = new Date();

		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const milliseconds = date.getMilliseconds();

		const time = `${hours}:${minutes}:${seconds}.${milliseconds}`;

		return time;
	}

	private prepareReadline() {
		const date = this.getDate();
		const rl = createInterface({ input, output });

		return { rl, date };
	}

	debug(content: string[] | string) {
		const { rl, date } = this.prepareReadline();
		rl.write(`\x1b[32m${date} | DEBUG:\x1b[0m ` + content + "\n");
		rl.close();
	}

	info(content: string[] | string) {
		const { rl, date } = this.prepareReadline();
		rl.write(`\x1b[34m${date} | INFO:\x1b[0m ` + content + "\n");
		rl.close();
	}

	warning(content: string[] | string) {
		const { rl, date } = this.prepareReadline();
		rl.write(`\x1b[93m${date} | WARN:\x1b[0m ` + content + "\n");
		rl.close();
	}

	alert(content: string[] | string) {
		const { rl, date } = this.prepareReadline();
		rl.write(`\x1b[33m${date} | ALERT:\x1b[0m ` + content + "\n");
		rl.close();
	}

	error(content: string[] | string) {
		const { rl, date } = this.prepareReadline();
		rl.write(`\x1b[91m${date} | ERROR:\x1b[0m ` + content + "\n");
		rl.close();
	}

	critical(content: string[] | string) {
		const { rl, date } = this.prepareReadline();
		rl.write(`\x1b[31m${date} | CRITICAL:\x1b[0m ` + content + "\n");
		rl.close();
	}

	emergency(content: string[] | string) {
		const { rl, date } = this.prepareReadline();
		rl.write(`\x1b[95m${date} | EMERGENCY:\x1b[0m ` + content + "\n");
		rl.close();
	}
}
