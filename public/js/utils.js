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
}
