module.exports = {
    development: {
        transporter: process.env.BROKER_TRANSPORTER || 'nats://localhost:4222',
        logger: console
    },
    test: {
        transporter: process.env.BROKER_TRANSPORTER || 'nats://localhost:4222',
        logger: console
    },
    production: {
        transporter: process.env.BROKER_TRANSPORTER,
        logger: console 
    },

    getDefaultEnvConfig() {
        return this[process.env.NODE_ENV || 'development'];
    }
};
