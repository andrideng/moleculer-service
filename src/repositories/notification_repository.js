const joi = require('joi');
const util = require('../../util');

const SEND_NOTIFICATION_SCHEMA = joi.object().keys({
    from: joi
        .string()
        .email()
        .required(),
    to: joi
        .string()
        .email()
        .required(),
    subject: joi
        .string()
        .required(),
    message: joi
        .string()
        .required()
});

module.exports = {
    // - validate send notification
    async validateSendNotification(payload) {
        return await joi.validate(payload, SEND_NOTIFICATION_SCHEMA).catch(err => {
            throw util.errorResponse(new Error(err), 400);
        });
    },

    async sendNotification(payload) {
        try {
            const { from, to, subject, message } = payload;
            return `success send: ${message}, with subject: ${subject}, from: ${from}, to: ${to}`;
        } catch (err) {
            throw err;
        }
    }
};
