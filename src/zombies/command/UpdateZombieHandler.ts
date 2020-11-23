import { UpdateZombie } from './UpdateZombie';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ZombieRepository } from '../repository/ZombieRepository';

@CommandHandler(UpdateZombie)
export class UpdateZombieHandler implements ICommandHandler<UpdateZombie> {
  constructor(private repository: ZombieRepository) {}

  async execute(command: UpdateZombie): Promise<void> {
    await this.repository.update(command.id, command.payload);
  }
}
