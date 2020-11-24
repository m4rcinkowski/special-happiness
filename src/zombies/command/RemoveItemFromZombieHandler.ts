import { RemoveItemFromZombie } from './RemoveItemFromZombie';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ItemsRepository } from '../repository/ItemsRepository';

@CommandHandler(RemoveItemFromZombie)
export class RemoveItemFromZombieHandler
  implements ICommandHandler<RemoveItemFromZombie> {
  constructor(private repository: ItemsRepository) {}

  async execute(command: RemoveItemFromZombie): Promise<any> {
    await this.repository.delete(command.getZombieId(), command.getItemId());
  }
}
