import { DeleteZombie } from './DeleteZombie';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ZombieRepository } from '../repository/ZombieRepository';

@CommandHandler(DeleteZombie)
export class DeleteZombieHandler implements ICommandHandler<DeleteZombie> {
  constructor(private repository: ZombieRepository) {}

  async execute(command: DeleteZombie): Promise<void> {
    await this.repository.delete(command.id);
  }
}
