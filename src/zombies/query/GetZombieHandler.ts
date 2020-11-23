import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetZombie } from './GetZombie';
import { ZombieRepository } from '../repository/ZombieRepository';
import { Zombie } from '../domain/Zombie';

@QueryHandler(GetZombie)
export class GetZombieHandler implements IQueryHandler<GetZombie> {
  constructor(private repository: ZombieRepository) {}

  async execute(query: GetZombie): Promise<Zombie> {
    return this.repository.getById(query.id);
  }
}
