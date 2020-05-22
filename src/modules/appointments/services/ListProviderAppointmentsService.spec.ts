import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: 'user',
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
