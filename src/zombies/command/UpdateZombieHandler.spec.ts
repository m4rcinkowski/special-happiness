import { ZombieRepository } from '../repository/ZombieRepository';
import { Test } from '@nestjs/testing';
import { UpdateZombieHandler } from './UpdateZombieHandler';
import { UpdateZombie } from './UpdateZombie';

describe('UpdateZombieHandler', () => {
  let handler: UpdateZombieHandler;
  let repository: ZombieRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateZombieHandler,
        {
          provide: ZombieRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get(UpdateZombieHandler);
    repository = module.get(ZombieRepository);
  });

  it('Should call repository method', async () => {
    await handler.execute(
      new UpdateZombie('2b31cc1f-8638-4871-b44d-d40910d3440c', {
        name: 'Wojtek',
        createdAt: new Date('2017-09-12').toISOString(),
      }),
    );

    expect(repository.update).toBeCalledTimes(1);
  });
});
