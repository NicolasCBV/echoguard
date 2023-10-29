class LogsRepoHandler {
  logs = window.logsEntities;

  constructor() {
    window.logsEntities = undefined;
  }

  getByLevel(input) {
    if(input !== 'ALL')
      return this.logs.filter((item) => (
        item.level === input
      ));

    return this.logs;
  }
}

const logsRepo = new LogsRepoHandler();

export { logsRepo }
