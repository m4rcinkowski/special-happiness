import { CreateZombieHandler } from './CreateZombieHandler';
import { IdGenerator } from '../../common/IdGenerator';
import { ZombieRepository } from '../repository/ZombieRepository';
import { Test } from '@nestjs/testing';
import { CreateZombie } from './CreateZombie';

describe('CreateZombieHandler', () => {
  let handler: CreateZombieHandler;
  let repository: ZombieRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateZombieHandler,
        {
          provide: IdGenerator,
          useValue: {
            generateId: jest.fn(),
          },
        },
        {
          provide: ZombieRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get(CreateZombieHandler);
    repository = module.get(ZombieRepository);
  });

  it('Should call repository method', async () => {
    await handler.execute(
      new CreateZombie({
        name: 'Wojtek',
        createdAt: new Date('2017-09-12').toISOString(),
      }),
    );

    expect(repository.create).toBeCalledTimes(1);
  });
});
