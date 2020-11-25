import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListZombieItems } from './ListZombieItems';
import { ItemsRepository } from '../repository/ItemsRepository';
import { ItemCollection } from '../domain/ItemCollection';
import { TotalValueCalculationService } from '../service/TotalValueCalculationService';

@QueryHandler(ListZombieItems)
export class ListZombieItemsHandler implements IQueryHandler<ListZombieItems> {
  constructor(
    private readonly repository: ItemsRepository,
    private readonly totalValueService: TotalValueCalculationService,
  ) {}

  async execute(query: ListZombieItems): Promise<ItemCollection> {
    const items = await this.repository.getAll(query.getZombieId());
    const totalValue = await this.totalValueService.getTotalValues(items);

    return new ItemCollection(items, totalValue);
  }
}
