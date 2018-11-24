const sinon = require('sinon');
const UserService = require('../../src/services/users.service');
const UserRepository = require('../../src/repositories/user_repository');

const VALID_PARAMS = {
    email: 'andri.deng@qoala.id',
    password: 'qoala.id',
    confirmationPassword: 'qoala.id'
};

describe('User Service', () => {
    let sandbox = null;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe('Create User', () => {
        it('catch error when payload is invalid', () => {
            // - mock validateCreateUser
            sandbox
                .mock(UserRepository)
                .expects('validateCreateUser')
                .throws(new Error('validateCreateUser failed!'));
            const context = {
                params: VALID_PARAMS
            };
            // - call create action
            UserService
                .actions
                .create(context)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.message).toEqual('validateCreateUser failed!');
                });
        });

        it('catch error when create is failed', () => {
            // - mock validateCreateUser
            sandbox
                .mock(UserRepository)
                .expects('validateCreateUser')
                .resolves({});
            sandbox
                .mock(UserRepository)
                .expects('create')
                .throws(new Error('create failed!'));
            const context = {
                params: VALID_PARAMS
            };
            // - call create action
            UserService
                .actions
                .create(context)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.message).toEqual('create failed!');
                });
        });

        it('catch error when broker call send notifications is failed', () => {
            // - mock validateCreateUser
            sandbox
                .mock(UserRepository)
                .expects('validateCreateUser')
                .resolves({});
            sandbox
                .mock(UserRepository)
                .expects('create')
                .resolves({});
            const context = {
                params: VALID_PARAMS,
                broker: {
                    call() {
                        throw new Error('broker sendNotification failed!');
                    }
                }
            };
            // - call create action
            UserService
                .actions
                .create(context)
                .then(() => {
                    throw new Error('it should failed!');
                })
                .catch((error) => {
                    expect(error.message).toEqual('broker sendNotification failed!');
                });
        });

        it('return ok', () => {
            const { email } = VALID_PARAMS;
            // - mock validateCreateUser
            sandbox
                .mock(UserRepository)
                .expects('validateCreateUser')
                .resolves(VALID_PARAMS);
            sandbox
                .mock(UserRepository)
                .expects('create')
                .resolves(`success create user with email: ${email}`);
            const context = {
                params: VALID_PARAMS,
                broker: {
                    call() {
                        return {};
                    }
                }
            };
            // - call create action
            UserService
                .actions
                .create(context)
                .then((res) => {
                    expect(res.status).toEqual(200);
                    expect(res.data.createUserPayload.email).toEqual(VALID_PARAMS.email);
                    expect(res.message.createUser).toEqual(`success create user with email: ${email}`);
                })
                .catch(() => {
                    throw new Error('it should return ok!');
                });
        });
    });
});
