import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { AddItemToZombie } from './AddItemToZombie';
import { Item } from '../domain/Item';
import { ItemsRepository } from '../repository/ItemsRepository';
import { GetExchangeItem } from '../query/GetExchangeItem';
import { ExchangeItem } from '../dto/ExchangeItem';

@CommandHandler(AddItemToZombie)
export class AddItemToZombieHandler
  implements ICommandHandler<AddItemToZombie> {
  constructor(
    private itemsRepository: ItemsRepository,
    private queryBus: QueryBus,
  ) {}

  async execute(command: AddItemToZombie): Promise<void> {
    const item: ExchangeItem = await this.queryBus.execute(
      new GetExchangeItem(command.getItemId()),
    );

    await this.itemsRepository.create(
      command.getZombieId(),
      new Item(command.getItemId(), item.name, item.price),
    );
  }
}
