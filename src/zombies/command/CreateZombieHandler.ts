import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateZombie } from './CreateZombie';
import { ZombieRepository } from '../repository/ZombieRepository';
import { IdGenerator } from '../../common/IdGenerator';

@CommandHandler(CreateZombie)
export class CreateZombieHandler implements ICommandHandler<CreateZombie> {
  constructor(
    private idGenerator: IdGenerator,
    private repository: ZombieRepository,
  ) {}

  async execute(command: CreateZombie): Promise<void> {
    const id = this.idGenerator.generateId();

    await this.repository.create(id, command.payload);
  }
}
