"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const logging_winston_1 = require("@google-cloud/logging-winston");
const { colorize, combine, printf, timestamp } = winston_1.format;
const colorizer = colorize();
class Logger {
    constructor(config) {
        this.loggerLabel = config.loggerLabel;
        this.instance = this.createWinstonLogger();
    }
    getInstance() {
        return this.instance;
    }
    createWinstonTransports() {
        const transports = [
            new winston_1.default.transports.Console({
                level: 'debug',
                handleExceptions: true,
                format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSS' }), printf((info) => {
                    return colorizer.colorize(info.level, `[${info.timestamp}] [${info.level.toUpperCase()}] [${this.loggerLabel}] ${info.message}`);
                }))
            })
        ];
        const runGoogleLogger = !!process.env.NODE_ENV;
        if (runGoogleLogger) {
            transports.push(new logging_winston_1.LoggingWinston({
                logName: this.loggerLabel,
                prefix: this.loggerLabel,
                labels: {
                    env: process.env.NODE_ENV || 'unknown'
                }
            }));
        }
        return transports;
    }
    createWinstonLogger() {
        return winston_1.default.createLogger({
            level: 'info',
            transports: this.createWinstonTransports(),
            exitOnError: false
        });
    }
}
exports.default = Logger;
//# sourceMappingURL=index.js.map