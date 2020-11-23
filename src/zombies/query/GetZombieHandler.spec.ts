import { ZombieRepository } from '../repository/ZombieRepository';
import { Test } from '@nestjs/testing';
import { GetZombieHandler } from './GetZombieHandler';
import { GetZombie } from './GetZombie';
import { Zombie } from '../domain/Zombie';
import Mock = jest.Mock;

describe('UpdateZombieHandler', () => {
  let handler: GetZombieHandler;
  let repository: ZombieRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetZombieHandler,
        {
          provide: ZombieRepository,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get(GetZombieHandler);
    repository = module.get(ZombieRepository);
  });

  it('Should call repository method', async () => {
    await handler.execute(
      new GetZombie('2b31cc1f-8638-4871-b44d-d40910d3440c'),
    );

    expect(repository.getById).toBeCalledTimes(1);
  });

  it('Should return a zombie instance', async () => {
    (repository.getById as Mock).mockResolvedValue(
      new Zombie(
        '2b31cc1f-8638-4871-b44d-d40910d3440c',
        'Kuba',
        new Date('2015-02-24').toISOString(),
      ),
    );

    const result = await handler.execute(
      new GetZombie('2b31cc1f-8638-4871-b44d-d40910d3440c'),
    );

    expect(result).toBeInstanceOf(Zombie);
  });
});
