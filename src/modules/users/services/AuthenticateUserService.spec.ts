import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'John2',
      email: 'John2@gmail.com',
      password: '123456789',
    });
    const response = await authenticateUser.execute({
      email: 'John2@gmail.com',
      password: '123456789',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be  able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'John2@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate an user with  wrong password', async () => {
    await createUserService.execute({
      name: 'John2',
      email: 'John2@gmail.com',
      password: '123456789',
    });
    await expect(
      authenticateUser.execute({
        email: 'John2@gmail.com',
        password: '1adwfgwefwe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
