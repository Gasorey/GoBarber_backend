import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUserRepository);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository);

    await createUserService.execute({
      name: 'John2',
      email: 'John2@gmail.com',
      password: '123456789',
    });
    const response = await authenticateUser.execute({
      email: 'John2@gmail.com',
      password: '123456789',
    });
    expect(response).toHaveProperty('token');
  });
});
