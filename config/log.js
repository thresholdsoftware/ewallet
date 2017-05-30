var winston = require('winston');
module.exports = {
    'log': {
          'colors': false,
        'custom': new (winston.Logger)({
            'transports': [
                new (winston.transports.Console)({
                    'level': 'info',
                    'colorize': false,
                    'timestamp': false,
                    'json': false
                }),
                new winston.transports.File({
                    'level': 'info   ',
                    'colorize': false,
                    'timestamp': true,
                    'json': true,
                    'filename': './logs/test.log',
                    'maxsize': 5120000,
                    'maxFiles': 3
                }),
                new winston.transports.DailyRotateFile({
                    'filename': './logs/info-',
                    'datePattern': 'yyyy-MM-dd.log',
                    'prepend': true,
                    'level': 'info',
                    'json':false
                    
                })
            ]
        })
    }
};