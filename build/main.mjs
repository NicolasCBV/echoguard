var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/main.ts
import { resolve } from "path";
import * as express from "express";

// src/app/entities/log.ts
import { randomUUID } from "crypto";
var LogsLevelEnum;
(function(LogsLevelEnum2) {
  LogsLevelEnum2["debug"] = "DEBUG";
  LogsLevelEnum2["info"] = "INFO";
  LogsLevelEnum2["warn"] = "WARNING";
  LogsLevelEnum2["error"] = "ERROR";
  LogsLevelEnum2["critical"] = "CRITICAL";
  LogsLevelEnum2["alert"] = "ALERT";
  LogsLevelEnum2["emergency"] = "EMERGENCY";
})(LogsLevelEnum || (LogsLevelEnum = {}));
var _LogEntitie = class _LogEntitie {
  constructor(input2, id) {
    __publicField(this, "_id");
    __publicField(this, "props");
    this._id = id ?? randomUUID();
    this.props = {
      ...input2,
      createdAt: input2.createdAt ?? /* @__PURE__ */ new Date()
    };
  }
  equalTo(input2) {
    return input2.name === this.props.name && input2.description === this.props.description && input2.createdAt === this.props.createdAt && input2.level === this.props.level && input2.layer === this.props.layer && input2.id === this._id;
  }
  // id
  get id() {
    return this._id;
  }
  // name
  get name() {
    return this.props.name;
  }
  set name(input2) {
    this.props.name = input2;
  }
  // description
  get description() {
    return this.props.description;
  }
  set description(input2) {
    this.props.description = input2;
  }
  // layer
  get layer() {
    return this.props.layer;
  }
  set layer(input2) {
    this.props.layer = input2;
  }
  // level
  get level() {
    return this.props.level;
  }
  set level(input2) {
    this.props.level = input2;
  }
  // createdAt
  get createdAt() {
    return this.props.createdAt;
  }
};
__name(_LogEntitie, "LogEntitie");
var LogEntitie = _LogEntitie;

// src/app/mapper/log.ts
var _LogMapper = class _LogMapper {
  static toObject(input2) {
    return {
      id: input2.id,
      name: input2.name,
      description: input2.description,
      layer: input2.layer,
      level: input2.level,
      createdAt: input2.createdAt
    };
  }
  static toClass(input2) {
    return new LogEntitie({
      name: input2.name,
      description: input2.description,
      layer: input2.layer,
      level: input2.level,
      createdAt: input2.createdAt
    }, input2.id);
  }
};
__name(_LogMapper, "LogMapper");
var LogMapper = _LogMapper;

// src/infra/storages/lmdb/index.ts
import { open } from "lmdb";

// src/infra/DTO/scanDBOutput.ts
import { date, object, string } from "yup";
var _ScanDBOutput = class _ScanDBOutput {
  static expectForLog(input2) {
    const schema = object({
      id: string().required(),
      name: string().required(),
      description: string().required(),
      layer: string().optional(),
      level: string().required(),
      createdAt: date().required()
    });
    const data = schema.validateSync(input2);
    return data;
  }
};
__name(_ScanDBOutput, "ScanDBOutput");
var ScanDBOutput = _ScanDBOutput;

// src/utils/error.ts
var _UtilError = class _UtilError extends Error {
  constructor(input2) {
    super();
    this.name = "Util Error";
    this.message = input2.message;
  }
};
__name(_UtilError, "UtilError");
var UtilError = _UtilError;

// src/utils/convertLogLevels.ts
function convertLogLevels(input2) {
  switch (input2) {
    case "DEBUG":
      return Logger.LogsLevelEnum.debug;
    case "INFO":
      return Logger.LogsLevelEnum.info;
    case "WARNING":
      return Logger.LogsLevelEnum.warn;
    case "ERROR":
      return Logger.LogsLevelEnum.error;
    case "CRITICAL":
      return Logger.LogsLevelEnum.critical;
    case "ALERT":
      return Logger.LogsLevelEnum.alert;
    case "EMERGENCY":
      return Logger.LogsLevelEnum.emergency;
    default:
      throw new UtilError({
        message: "Could not convert level to a valid enum"
      });
  }
}
__name(convertLogLevels, "convertLogLevels");

// src/infra/storages/lmdb/index.ts
var _LMDBService = class _LMDBService {
  constructor() {
    __publicField(this, "db");
    const path = process.env.NODE_ENV === "test" ? "log.test.db" : "log.db";
    this.db = open({
      path,
      compression: true
    });
  }
  async create(input2) {
    const key = `${input2.id}-${input2.name.replaceAll(" ", "_")}`;
    const logObject = LogMapper.toObject(input2);
    await this.db.put(key, logObject);
  }
  async delete(key) {
    await this.db.remove(key);
  }
  async getAll() {
    const logs = [];
    this.db.getRange({}).forEach(({ value }) => {
      const rawLog = ScanDBOutput.expectForLog(value);
      const parsedLog = LogMapper.toClass({
        ...rawLog,
        level: convertLogLevels(rawLog.level)
      });
      logs.push(parsedLog);
    });
    return logs;
  }
  async deleteAll() {
    await this.db.clearAsync();
  }
};
__name(_LMDBService, "LMDBService");
var LMDBService = _LMDBService;
var lmdbRepo = new LMDBService();

// src/app/services/getAllLog.service.ts
var _GetAllLogService = class _GetAllLogService {
  constructor(logRepo) {
    __publicField(this, "logRepo");
    this.logRepo = logRepo;
  }
  async exec() {
    const log = await this.logRepo.getAll();
    return log.map((item) => LogMapper.toObject(item));
  }
};
__name(_GetAllLogService, "GetAllLogService");
var GetAllLogService = _GetAllLogService;

// src/app/services/deleteLog.service.ts
var _DeleteLogService = class _DeleteLogService {
  constructor(logRepo) {
    __publicField(this, "logRepo");
    this.logRepo = logRepo;
  }
  async exec(input2) {
    await this.logRepo.delete(input2.key);
  }
};
__name(_DeleteLogService, "DeleteLogService");
var DeleteLogService = _DeleteLogService;

// src/app/services/createLog.service.ts
var _CreateLogService = class _CreateLogService {
  constructor(logRepo) {
    __publicField(this, "logRepo");
    this.logRepo = logRepo;
  }
  async exec(input2) {
    const log = new LogEntitie({
      name: input2.name,
      level: input2.level,
      layer: input2.layer,
      description: input2.description
    });
    await this.logRepo.create(log);
  }
};
__name(_CreateLogService, "CreateLogService");
var CreateLogService = _CreateLogService;

// src/infra/DTO/createLogDTO.ts
import { object as object2, string as string2 } from "yup";
var _CreateLogServiceDTO = class _CreateLogServiceDTO {
  static validate(input2) {
    const schema = object2({
      name: string2().required(),
      description: string2().required(),
      layer: string2().optional(),
      level: string2().required()
    });
    const data = schema.validateSync(input2);
    return data;
  }
};
__name(_CreateLogServiceDTO, "CreateLogServiceDTO");
var CreateLogServiceDTO = _CreateLogServiceDTO;

// src/infra/controllers/page.ts
var _PageController = class _PageController {
  constructor(getAllLogs) {
    __publicField(this, "getAllLogs");
    this.getAllLogs = getAllLogs;
    this.exec = this.exec.bind(this);
  }
  async exec(_, res) {
    const logs = await this.getAllLogs.exec();
    res.render("index.ejs", {
      logs,
      appName: Logger.appName
    });
  }
};
__name(_PageController, "PageController");
var PageController = _PageController;

// src/infra/DTO/deleteLogDTO.ts
import { object as object3, string as string3 } from "yup";
var _DeleteLogServiceDTO = class _DeleteLogServiceDTO {
  static validate(input2) {
    const schema = object3({
      id: string3().required(),
      name: string3().required()
    });
    const data = schema.validateSync(input2);
    return data;
  }
};
__name(_DeleteLogServiceDTO, "DeleteLogServiceDTO");
var DeleteLogServiceDTO = _DeleteLogServiceDTO;

// src/infra/controllers/deleteLog.ts
var _DeleteLogController = class _DeleteLogController {
  constructor(deleteLog) {
    __publicField(this, "deleteLog");
    this.deleteLog = deleteLog;
    this.exec = this.exec.bind(this);
  }
  async exec(req, res) {
    const body = DeleteLogServiceDTO.validate(req.body);
    const key = `${body.id}-${body.name.replaceAll(" ", "_")}`;
    await this.deleteLog.exec({
      key
    });
    res.status(204).end();
  }
};
__name(_DeleteLogController, "DeleteLogController");
var DeleteLogController = _DeleteLogController;

// src/app/services/deleteAllLogs.service.ts
var _DeleteAllLogsService = class _DeleteAllLogsService {
  constructor(logRepo) {
    __publicField(this, "logRepo");
    this.logRepo = logRepo;
  }
  async exec() {
    await this.logRepo.deleteAll();
  }
};
__name(_DeleteAllLogsService, "DeleteAllLogsService");
var DeleteAllLogsService = _DeleteAllLogsService;

// src/infra/controllers/deleteAllLogs.ts
var _DeleteAllLogsController = class _DeleteAllLogsController {
  constructor(deleteAllLogs) {
    __publicField(this, "deleteAllLogs");
    this.deleteAllLogs = deleteAllLogs;
    this.exec = this.exec.bind(this);
  }
  async exec(_, res) {
    await this.deleteAllLogs.exec();
    res.status(204).end();
  }
};
__name(_DeleteAllLogsController, "DeleteAllLogsController");
var DeleteAllLogsController = _DeleteAllLogsController;

// src/app/services/logger.service.ts
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
var _EchoService = class _EchoService {
  getDate() {
    const date2 = /* @__PURE__ */ new Date();
    const hours = date2.getHours();
    const minutes = date2.getMinutes();
    const seconds = date2.getSeconds();
    const milliseconds = date2.getMilliseconds();
    const time = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return time;
  }
  prepareReadline() {
    const date2 = this.getDate();
    const rl = createInterface({
      input,
      output
    });
    return {
      rl,
      date: date2
    };
  }
  debug(content) {
    const { rl, date: date2 } = this.prepareReadline();
    rl.write(`\x1B[32m${date2} | DEBUG:\x1B[0m ` + content + "\n");
    rl.close();
  }
  info(content) {
    const { rl, date: date2 } = this.prepareReadline();
    rl.write(`\x1B[34m${date2} | INFO:\x1B[0m ` + content + "\n");
    rl.close();
  }
  warning(content) {
    const { rl, date: date2 } = this.prepareReadline();
    rl.write(`\x1B[93m${date2} | WARN:\x1B[0m ` + content + "\n");
    rl.close();
  }
  alert(content) {
    const { rl, date: date2 } = this.prepareReadline();
    rl.write(`\x1B[33m${date2} | ALERT:\x1B[0m ` + content + "\n");
    rl.close();
  }
  error(content) {
    const { rl, date: date2 } = this.prepareReadline();
    rl.write(`\x1B[91m${date2} | ERROR:\x1B[0m ` + content + "\n");
    rl.close();
  }
  critical(content) {
    const { rl, date: date2 } = this.prepareReadline();
    rl.write(`\x1B[31m${date2} | CRITICAL:\x1B[0m ` + content + "\n");
    rl.close();
  }
  emergency(content) {
    const { rl, date: date2 } = this.prepareReadline();
    rl.write(`\x1B[95m${date2} | EMERGENCY:\x1B[0m ` + content + "\n");
    rl.close();
  }
};
__name(_EchoService, "EchoService");
var EchoService = _EchoService;

// src/utils/convertLevelToEchoMethod.ts
function runRightLog(log, echo) {
  const message = `${log.name} - ${log.description}`;
  switch (log.level) {
    case Logger.LogsLevelEnum.warn:
      echo.warning(message);
      break;
    case Logger.LogsLevelEnum.info:
      echo.info(message);
      break;
    case Logger.LogsLevelEnum.debug:
      echo.debug(message);
      break;
    case Logger.LogsLevelEnum.emergency:
      echo.emergency(message);
      break;
    case Logger.LogsLevelEnum.critical:
      echo.critical(message);
      break;
    case Logger.LogsLevelEnum.error:
      echo.error(message);
      break;
    case Logger.LogsLevelEnum.alert:
      echo.alert(message);
      break;
    default:
      throw new UtilError({
        message: "Could not convert level to a valid method"
      });
  }
}
__name(runRightLog, "runRightLog");

// src/main.ts
var Logger;
(function(Logger2) {
  Logger2.appName = "[App Name]";
  const echoService = new EchoService();
  const createLog = new CreateLogService(lmdbRepo);
  const getAllLog = new GetAllLogService(lmdbRepo);
  const deleteLog = new DeleteLogService(lmdbRepo);
  const deleteAllLogs = new DeleteAllLogsService(lmdbRepo);
  const pageController = new PageController(getAllLog);
  const deleteLogController = new DeleteLogController(deleteLog);
  const deleteAllLogsController = new DeleteAllLogsController(deleteAllLogs);
  async function start(input2) {
    Logger2.appName = input2.appName;
    const server = input2.server.getHttpAdapter().getInstance();
    server.use(express.static(resolve(__dirname, "..", "public")));
    server.use(express.json());
    server.set("view engine", "ejs");
    server.set("views", resolve(__dirname, "..", "views"));
    console.log(resolve(__dirname, "..", "views"));
    server.get("/logs", pageController.exec);
    server.delete("/logs", deleteLogController.exec);
    server.delete("/logs/all", deleteAllLogsController.exec);
  }
  __name(start, "start");
  Logger2.start = start;
  async function create(input2) {
    const data = CreateLogServiceDTO.validate(input2);
    runRightLog({
      name: input2.name,
      description: input2.description,
      level: input2.level
    }, echoService);
    await createLog.exec(data);
  }
  __name(create, "create");
  Logger2.create = create;
  let LogsLevelEnum2;
  (function(LogsLevelEnum3) {
    LogsLevelEnum3["debug"] = "DEBUG";
    LogsLevelEnum3["info"] = "INFO";
    LogsLevelEnum3["warn"] = "WARNING";
    LogsLevelEnum3["error"] = "ERROR";
    LogsLevelEnum3["critical"] = "CRITICAL";
    LogsLevelEnum3["alert"] = "ALERT";
    LogsLevelEnum3["emergency"] = "EMERGENCY";
  })(LogsLevelEnum2 = Logger2.LogsLevelEnum || (Logger2.LogsLevelEnum = {}));
})(Logger || (Logger = {}));
export {
  Logger
};
