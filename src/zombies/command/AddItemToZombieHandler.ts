import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddItemToZombie } from './AddItemToZombie';
import { Item } from '../domain/Item';
import { ItemsRepository } from '../repository/ItemsRepository';

@CommandHandler(AddItemToZombie)
export class AddItemToZombieHandler
  implements ICommandHandler<AddItemToZombie> {
  constructor(private itemsRepository: ItemsRepository) {}
  async execute(command: AddItemToZombie): Promise<any> {
    await this.itemsRepository.create(
      command.getZombieId(),
      new Item(command.getItemId(), 'Dupa', 1200),
    );
    return Promise.resolve(undefined);
  }
}
