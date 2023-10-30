export class Utils {
	static getAwesomeIcon(input) {
		switch(input) {
			case 'ERROR':
			return 'fa-bomb'
		case 'ALERT':
			return 'fa-bell'
		case 'DEBUG':
			return 'fa-bug'
		case 'WARNING':
			return 'fa-triangle-exclamation'
		case 'EMERGENCY':
			return 'fa-skull-crossbones'
		case 'INFO':
			return 'fa-circle-info'
		case 'CRITICAL':
			return 'fa-circle-radiation'
		}
	}

	static formatDate(date) {
		const rawSeconds = date.getSeconds();
		const rawMinutes = date.getMinutes();
		const rawHours = date.getHours();
		const day = date.getUTCDate();
		const month = date.getUTCMonth() + 1;
		const year = date.getUTCFullYear();

		const seconds = rawSeconds > 9 ? rawSeconds : `0${rawSeconds}`;
		const minutes = rawMinutes > 9 ? rawMinutes : `0${rawMinutes}`;
		const hours = rawHours > 9 ? rawHours : `0${rawHours}`; 

		return `${month}/${day}/${year} at ${hours}:${minutes}:${seconds}`;
	}
}
