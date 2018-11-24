const UserRepository = require('../repositories/user_repository');
const util = require('../../util');

module.exports = {
    name: 'users',
    actions: {
        async create(context) {
            const { params, broker } = context;
            try {
                // - validate create user
                const payload = await UserRepository.validateCreateUser(params);
                // - create user
                const createUser = await UserRepository.create(payload);
                // - send notification to user
                const notificationPayload = {
                    from: 'tech@qoala.id',
                    to: payload.email,
                    subject: 'Welcome to Qoala',
                    message: 'Success register to Qoala.'
                };
                const sendNotification = await broker.call('notifications.sendNotification', notificationPayload);

                return util.successResponse(
                    200,
                    {
                        createUserPayload: {
                            email: payload.email
                        },
                        notificationPayload
                    },
                    {
                        createUser,
                        sendNotification
                    }
                );
            } catch (err) {
                throw err;
            }
        }
    }
};
