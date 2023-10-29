import { NestExpressApplication } from '@nestjs/platform-express';

declare enum LogsLevelEnum {
    debug = "DEBUG",
    info = "INFO",
    warn = "WARNING",
    error = "ERROR",
    critical = "CRITICAL",
    alert = "ALERT",
    emergency = "EMERGENCY"
}

interface ICreateLogServiceProps {
    name: string;
    layer?: string;
    level: LogsLevelEnum;
    description: string;
}

interface IStartProps {
    server: NestExpressApplication;
    appName: string;
}
declare namespace Logger {
    let appName: string;
    function start(input: IStartProps): Promise<void>;
    function create(input: ICreateLogServiceProps): Promise<void>;
    enum LogsLevelEnum {
        debug = "DEBUG",
        info = "INFO",
        warn = "WARNING",
        error = "ERROR",
        critical = "CRITICAL",
        alert = "ALERT",
        emergency = "EMERGENCY"
    }
}

export { Logger };
