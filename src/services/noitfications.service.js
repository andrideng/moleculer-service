const NotificationRepository = require('../repositories/notification_repository');
const util = require('../../util');

module.exports = {
    name: 'notifications',
    actions: {
        async sendNotification(context) {
            const { params } = context;
            try {
                // - validate send notification
                const payload = await NotificationRepository.validateSendNotification(params);
                // - send notification
                const sendNotification = await NotificationRepository.sendNotification(payload);

                return util.successResponse(200, payload, sendNotification);
            } catch (err) {
                throw err;
            }
        }
    }
};
