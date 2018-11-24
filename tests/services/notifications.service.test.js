const sinon = require('sinon');
const NotificationService = require('../../src/services/notifications.service');
const NotificationRepository = require('../../src/repositories/notification_repository');

const VALID_PARAMS = {
    from: 'tech@qoala.id',
    to: 'andri.deng@qoala.id',
    subject: 'Welcome to Qoala',
    message: 'Success Register to qoala!'
};

describe('Notification Service', () => {
    let sandbox = null;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe('Send Notification', () => {
        it('catch error when payload is invalid', async () => {
            // - mock validateSendNotification
            sandbox
                .mock(NotificationRepository)
                .expects('validateSendNotification')
                .throws(new Error('validateSendNotification failed!'));
            const context = {
                params: VALID_PARAMS
            };
            // - call sendNotification action
            await NotificationService
                .actions
                .sendNotification(context)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.message).toEqual('validateSendNotification failed!');
                });
        });

        it('catch error when create is failed', async () => {
            // - mock validateSendNotification
            sandbox
                .mock(NotificationRepository)
                .expects('validateSendNotification')
                .resolves({});
            sandbox
                .mock(NotificationRepository)
                .expects('sendNotification')
                .throws(new Error('sendNotification failed!'));
            const context = {
                params: VALID_PARAMS
            };
            // - call sendNotification action
            await NotificationService
                .actions
                .sendNotification(context)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.message).toEqual('sendNotification failed!');
                });
        });
    });
});
