const { createLogger, format, transports } = require('winston')

module.exports = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'DD/MM/YYYY HH:mm:ss.SSS'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})
