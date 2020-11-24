import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExchangeItem } from './GetExchangeItem';
import { ExchangeItem } from '../dto/ExchangeItem';
import { ItemExchangeService } from '../service/ItemExchangeService';

@QueryHandler(GetExchangeItem)
export class GetExchangeItemHandler implements IQueryHandler<GetExchangeItem> {
  constructor(private readonly exchangeService: ItemExchangeService) {}

  async execute(query: GetExchangeItem): Promise<ExchangeItem> {
    //todo cache for whole list
    const items = await this.exchangeService.getAll();

    return items.find((item) => item.id === query.id);
  }
}
