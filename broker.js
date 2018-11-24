const { ServiceBroker } = require('moleculer');
const config = require('./src/config/app.config').getDefaultEnvConfig();
const { transporter, logger } = config;
const broker = new ServiceBroker({
    transporter,
    logger
});

broker.loadServices('./src/services/');
broker
    .start()
    .then(() => broker.waitForServices())
    .then(() => broker.repl());
