import winston, { format } from 'winston';

import { LoggingWinston } from '@google-cloud/logging-winston';

const { colorize, combine, printf, timestamp } = format;

const colorizer = colorize();

export interface ILoggerConfig {
  loggerLabel: string;
}

class Logger {
  public loggerLabel: string;
  private instance: winston.Logger;

  constructor(config: ILoggerConfig) {
    this.loggerLabel = config?.loggerLabel || '';
    this.instance = this.createWinstonLogger();
  }

  public getInstance(): winston.Logger {
    return this.instance;
  }

  private createWinstonTransports(): winston.transport[] {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: combine(
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSS' }),
          printf((info) => {
            return colorizer.colorize(
              info.level,
              `[${info.timestamp}] [${info.level.toUpperCase()}] [${this.loggerLabel}] ${info.message}`
            );
          })
        )
      })
    ];

    const runGoogleLogger = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa';
    if (runGoogleLogger) {
      transports.push(
        new LoggingWinston({
          logName: this.loggerLabel,
          prefix: this.loggerLabel,
          labels: {
            env: process.env.NODE_ENV || 'unknown'
          }
        })
      );
    }

    return transports;
  }

  private createWinstonLogger(): winston.Logger {
    return winston.createLogger({
      level: 'info',
      transports: this.createWinstonTransports(),
      exitOnError: false
    });
  }
}

export default Logger;
