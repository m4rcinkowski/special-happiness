import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListZombieItems } from './ListZombieItems';
import { ItemsRepository } from '../repository/ItemsRepository';
import { Item } from '../domain/Item';

@QueryHandler(ListZombieItems)
export class ListZombieItemsHandler implements IQueryHandler<ListZombieItems> {
  constructor(private repository: ItemsRepository) {}

  async execute(query: ListZombieItems): Promise<Item[]> {
    return this.repository.getAll(query.getZombieId());
  }
}
