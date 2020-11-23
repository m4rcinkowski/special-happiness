import { ZombieRepository } from '../repository/ZombieRepository';
import { Test } from '@nestjs/testing';
import { Zombie } from '../domain/Zombie';
import { ListZombiesHandler } from './ListZombiesHandler';
import Mock = jest.Mock;

describe('UpdateZombieHandler', () => {
  let handler: ListZombiesHandler;
  let repository: ZombieRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ListZombiesHandler,
        {
          provide: ZombieRepository,
          useValue: <Partial<ZombieRepository>>{
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get(ListZombiesHandler);
    repository = module.get(ZombieRepository);
  });

  it('Should call repository method', async () => {
    await handler.execute();

    expect(repository.getAll).toBeCalledTimes(1);
  });

  it('Should return a list of zombies', async () => {
    (repository.getAll as Mock).mockResolvedValue([
      new Zombie(
        '2b31cc1f-8638-4871-b44d-d40910d3440c',
        'Kuba',
        new Date('2015-02-24').toISOString(),
      ),
      new Zombie(
        'dde11f6b-911c-4d98-b111-9cc782bd9567',
        'Wojtek',
        new Date('2017-09-12').toISOString(),
      ),
    ]);

    const result = await handler.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
  });
});
