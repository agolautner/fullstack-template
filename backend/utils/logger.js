const pino = require('pino');
const { createPinoBrowserSend, createWriteStream } = require('pino-logflare');


const stream = createWriteStream({
    apiKey: process.env.LOGFLARE_API_KEY,
    sourceToken: process.env.LOGFLARE_SOURCE_ID
});

// create pino-logflare browser stream
const send = createPinoBrowserSend({
    apiKey: process.env.LOGFLARE_API_KEY,
    sourceToken: process.env.LOGFLARE_SOURCE_ID
});

// create pino loggger
const logger = pino({
    browser: {
        transmit: {
            send: send,
        }
    }
}, stream);

module.exports = logger