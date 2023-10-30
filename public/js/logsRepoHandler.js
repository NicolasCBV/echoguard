class LogsRepoHandler {
  logs = window.logsEntities;

  constructor() {
    window.logsEntities = undefined;
  }

  getByLevel(input) {
    let repo = [];
    if(input !== 'ALL')
      repo = this.logs.filter((item) => (
        item.level === input
      ));
    else
      repo = this.logs;

    return repo.sort((a, b) => {
        if(a.createdAt > b.createdAt)
            return -1;
        else if( a.createdAt < b.createdAt)
            return 1;
        else
            return 0;
    });
  }
}

const logsRepo = new LogsRepoHandler();

export { logsRepo }
