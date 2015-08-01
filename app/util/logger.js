import winston from 'winston';
winston.emitErrs = true;

export const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

export const stream = {
  write: function (message) {
    logger.info(message);
  }
};
