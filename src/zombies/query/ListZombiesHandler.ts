import { ListZombies } from './ListZombies';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ZombieRepository } from '../repository/ZombieRepository';
import { Zombie } from '../domain/Zombie';

@QueryHandler(ListZombies)
export class ListZombiesHandler implements IQueryHandler<ListZombies> {
  constructor(private repository: ZombieRepository) {}

  async execute(): Promise<Zombie[]> {
    return this.repository.getAll();
  }
}
