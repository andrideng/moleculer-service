const joi = require('joi');
const util = require('../../util');

const CREATE_USER_SCHEMA = joi.object().keys({
    email: joi
        .string()
        .email()
        .required(),
    password: joi
        .string()
        .required(),
    confirmationPassword: joi
        .string()
        .valid(joi.ref('password'))
        .options({
            language: {
                any: {
                    allowOnly: 'must match password'
                }
            }
        })
        .required()
});

module.exports = {
    async validateCreateUser(payload) {
        return await joi.validate(payload, CREATE_USER_SCHEMA).catch(err => {
            throw util.errorResponse(new Error(err), 400);
        });
    },

    async create(payload) {
        try {
            const { email } = payload;
            return `success create user with email: ${email}`;
        } catch (err) {
            throw err;
        }
    }
};
