import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'Fake1@mail.com',
      name: 'Fake 1',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      email: 'Fake2@mail.com',
      name: 'Fake 2',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      email: 'Fake3@mail.com',
      name: 'Fake 3',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
