const { ServiceBroker } = require('moleculer');
const ApiService = require('moleculer-web');
const config = require('./src/config/app.config').getDefaultEnvConfig();
const { transporter, logger } = config;

const broker = new ServiceBroker({
    transporter,
    logger
});

broker.loadServices('./src/services/');

broker.createService({
    mixins: Array.of(ApiService),
    settings: {
        cors: {
            origin: '*',
            methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: true,
            exposedHeaders: true,
            credentials: false,
            maxAge: 3600
        },
        path: '/api',
        routes: [
            {
                aliases: {
                    // - user service
                    'POST registrations': 'users.create'
                },
                onError(req, res, error) {
                    const { message } = error;
                    const { errorMessage, errorCode } = message;
                    const statusCode = errorCode || 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = statusCode;
                    res.end(JSON.stringify({
                        status: statusCode,
                        message: errorMessage
                    }));
                }
            }
        ]
    }
});

broker
    .start()
    .then(() => broker.waitForServices())
    .then(() => broker.repl());