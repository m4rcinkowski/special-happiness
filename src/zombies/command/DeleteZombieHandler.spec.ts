import { ZombieRepository } from '../repository/ZombieRepository';
import { Test } from '@nestjs/testing';
import { DeleteZombieHandler } from './DeleteZombieHandler';
import { DeleteZombie } from './DeleteZombie';

describe('DeleteZombieHandler', () => {
  let handler: DeleteZombieHandler;
  let repository: ZombieRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteZombieHandler,
        {
          provide: ZombieRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get(DeleteZombieHandler);
    repository = module.get(ZombieRepository);
  });

  it('Should call repository method', async () => {
    await handler.execute(
      new DeleteZombie('1ef9ae4e-ce4a-4906-b3b0-f5be560c7d65'),
    );

    expect(repository.delete).toBeCalledTimes(1);
    expect(repository.delete).toBeCalledWith(
      '1ef9ae4e-ce4a-4906-b3b0-f5be560c7d65',
    );
  });
});
