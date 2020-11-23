import { Test } from '@nestjs/testing';
import { InMemoryZombieRepository } from './InMemoryZombieRepository';

describe('InMemoryZombieRepository', () => {
  let repository: InMemoryZombieRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [InMemoryZombieRepository],
    }).compile();

    repository = module.get(InMemoryZombieRepository);
  });

  it('Should be able return an item after adding it', async () => {
    await repository.create('8f288b66-e749-4efc-853a-a868307404e0', {
      name: 'Kuba',
      createdAt: new Date('2015-02-24').toISOString(),
    });

    expect(
      await repository.getById('8f288b66-e749-4efc-853a-a868307404e0'),
    ).not.toBeUndefined();
  });

  it('Should return a list of items', async () => {
    await repository.create('8f288b66-e749-4efc-853a-a868307404e0', {
      name: 'Kuba',
      createdAt: new Date('2015-02-24').toISOString(),
    });

    expect(await repository.getAll()).toHaveLength(1);
  });

  it('Should NOT be able return an item after deleting it', async () => {
    await repository.create('8f288b66-e749-4efc-853a-a868307404e0', {
      name: 'Kuba',
      createdAt: new Date('2015-02-24').toISOString(),
    });
    await repository.delete('8f288b66-e749-4efc-853a-a868307404e0');

    expect(
      await repository.getById('8f288b66-e749-4efc-853a-a868307404e0'),
    ).toBeUndefined();
  });

  it('Should create an item by updating', async () => {
    await repository.update('94d2e02e-2697-4537-a2fb-0b00c5a1fd51', {
      name: 'Kuba',
      createdAt: new Date('2015-02-24').toISOString(),
    });

    expect(
      await repository.getById('94d2e02e-2697-4537-a2fb-0b00c5a1fd51'),
    ).not.toBeUndefined();
  });
});
