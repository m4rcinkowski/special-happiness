import { Test } from '@nestjs/testing';
import { InMemoryItemsRepository } from './InMemoryItemsRepository';
import { Item } from '../domain/Item';

describe('InMemoryItemsRepository', () => {
  let repository: InMemoryItemsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [InMemoryItemsRepository],
    }).compile();

    repository = module.get(InMemoryItemsRepository);
  });

  it('should add an item to the repository', async () => {
    await repository.create(
      'f8fa8047-4d43-4fd8-a0fd-c1065eedfb18',
      new Item(42, 'Axe', 100),
    );

    expect(
      await repository.getAll('f8fa8047-4d43-4fd8-a0fd-c1065eedfb18'),
    ).toHaveLength(1);
  });

  it('should remove an item from the repository', async () => {
    await repository.create(
      'ea0ec8b5-bfdc-4a10-bc56-77250857ec1a',
      new Item(42, 'Axe', 100),
    );
    await repository.delete('ea0ec8b5-bfdc-4a10-bc56-77250857ec1a', 42);

    expect(
      await repository.getAll('ea0ec8b5-bfdc-4a10-bc56-77250857ec1a'),
    ).toHaveLength(0);
  });
});
