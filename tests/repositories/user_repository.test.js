const _ = require('lodash');
const UserRepository = require('../../src/repositories/user_repository');

const VALID_REGISTRATION_PAYLOAD = {
    email: 'andri.deng@qoala.id',
    password: 'qoala.id',
    confirmationPassword: 'qoala.id'
};

describe('User Repository', () => {
    describe('#createUser', async () => {
        it('throws error when email is empty', async () => {
            const payload = _
                .chain(VALID_REGISTRATION_PAYLOAD)
                .clone()
                .assign({
                    email: ''
                })
                .value();
            await UserRepository.validateCreateUser(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"email\" fails because [\"email\" is not allowed to be empty]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when email is not valid email', async () => {
            const payload = _
                .chain(VALID_REGISTRATION_PAYLOAD)
                .clone()
                .assign({
                    email: 'tech.qoala'
                })
                .value();
            await UserRepository.validateCreateUser(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child "email" fails because ["email" must be a valid email]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when password is empty', async () => {
            const payload = _
                .chain(VALID_REGISTRATION_PAYLOAD)
                .clone()
                .assign({
                    password: ''
                })
                .value();
            await UserRepository.validateCreateUser(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"password\" fails because [\"password\" is not allowed to be empty]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when confirmation confirmationPassword is empty', async () => {
            const payload = _
                .chain(VALID_REGISTRATION_PAYLOAD)
                .clone()
                .assign({
                    confirmationPassword: ''
                })
                .value();
            await UserRepository.validateCreateUser(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"confirmationPassword\" fails because [\"confirmationPassword\" is not allowed to be empty]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('throws error when confirmation confirmationPassword is not match with password', async () => {
            const payload = _
                .chain(VALID_REGISTRATION_PAYLOAD)
                .clone()
                .assign({
                    confirmationPassword: 'id.qoala'
                })
                .value();
            await UserRepository.validateCreateUser(payload)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.errorMessage).toEqual(
                        'Error: ValidationError: child \"confirmationPassword\" fails because [\"confirmationPassword\" must match password]'
                    );
                    expect(error.errorCode).toEqual(400);
                });
        });

        it('should returns ok', async () => {
            const { email } = VALID_REGISTRATION_PAYLOAD;
            const result = await UserRepository.create(
                VALID_REGISTRATION_PAYLOAD
            );
            expect(result).toEqual(
                `success create user with email: ${email}`
            );
        });
    });
});
