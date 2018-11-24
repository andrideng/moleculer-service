const _ = require('lodash');
const NotificationRepository = require('../../src/repositories/notification_repository');

const VALID_SEND_NOTIFICATION_PAYLOAD = {
    from: 'tech@qoala.id',
    to: 'andri.deng@qoala.id',
    subject: 'Welcome to Qoala',
    message: 'Success Register to qoala!'
};

describe('Notification Repository', () => {
    describe('#sendNotification', async () => {
        it('throws error when from is empty', async () => {
            const payload = _
                .chain(VALID_SEND_NOTIFICATION_PAYLOAD)
                .clone()
                .assign({
                    from: ''
                })
                .value();
            await NotificationRepository.validateSendNotification(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"from\" fails because [\"from\" is not allowed to be empty]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when from is not valid email', async () => {
            const payload = _
                .chain(VALID_SEND_NOTIFICATION_PAYLOAD)
                .clone()
                .assign({
                    from: 'bandung.js'
                })
                .value();
            await NotificationRepository.validateSendNotification(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child "from" fails because ["from" must be a valid email]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when to is empty', async () => {
            const payload = _
                .chain(VALID_SEND_NOTIFICATION_PAYLOAD)
                .clone()
                .assign({
                    to: ''
                })
                .value();
            await NotificationRepository.validateSendNotification(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"to\" fails because [\"to\" is not allowed to be empty]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when to is not valid email', async () => {
            const payload = _
                .chain(VALID_SEND_NOTIFICATION_PAYLOAD)
                .clone()
                .assign({
                    to: 'jakarta.js'
                })
                .value();
            await NotificationRepository.validateSendNotification(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child "to" fails because ["to" must be a valid email]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when subject is empty', async () => {
            const payload = _
                .chain(VALID_SEND_NOTIFICATION_PAYLOAD)
                .clone()
                .assign({
                    subject: ''
                })
                .value();
            await NotificationRepository.validateSendNotification(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"subject\" fails because [\"subject\" is not allowed to be empty]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when message is empty', async () => {
            const payload = _
                .chain(VALID_SEND_NOTIFICATION_PAYLOAD)
                .clone()
                .assign({
                    message: ''
                })
                .value();
            await NotificationRepository.validateSendNotification(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"message\" fails because [\"message\" is not allowed to be empty]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('should returns ok', async () => {
            const { message, subject, from, to } = VALID_SEND_NOTIFICATION_PAYLOAD;
            const result = await NotificationRepository.sendNotification(
                VALID_SEND_NOTIFICATION_PAYLOAD
            );
            expect(result).toEqual(
                `success send: ${message}, with subject: ${subject}, from: ${from}, to: ${to}`
            );
        });
    });
});
