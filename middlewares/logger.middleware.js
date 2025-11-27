import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports: [
        new winston.transports.File({ filename: 'logs.txt' })
    ]
});

const loggerMiddleware = async (req, res, next) => {
    try {
        if (!req.url.includes('signin')) { 
            const logData = `${req.url} - ${JSON.stringify(req.body)}`;
            logger.info(logData);
        }
    } catch (err) {
        console.error("Logging error:", err);
    }

    next();
};

export default loggerMiddleware;
