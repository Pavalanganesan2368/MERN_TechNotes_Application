const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fileSystem = require('fs');
const filePromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fileSystem.existsSync(path.join(__dirname, "..", "log"))) {
            await filePromises.mkdir(path.join(__dirname, "..", "log"))
        }
        await filePromises.appendFile(path.join(__dirname, "..", "log", logFileName), logItem);
    } catch (error) {
        console.log(error.message)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports= { logEvents, logger };