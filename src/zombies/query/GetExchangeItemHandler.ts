import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExchangeItem } from './GetExchangeItem';
import { ExchangeItem } from '../dto/ExchangeItem';
import { ItemExchangeService } from '../service/ItemExchangeService';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ExchangeItemsList } from '../dto/ExchangeItemsList';

const CACHE_KEY = 'exchange-items-list';
const CACHE_TTL = 86400;

@QueryHandler(GetExchangeItem)
export class GetExchangeItemHandler implements IQueryHandler<GetExchangeItem> {
  constructor(
    private readonly exchangeService: ItemExchangeService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async execute(query: GetExchangeItem): Promise<ExchangeItem> {
    const list = await this.getList(query);
    const item = (list.items || []).find((item) => item.id === query.id);

    if (!item) {
      throw new Error('No item found in the service');
    }

    return item;
  }

  private async getList(query: GetExchangeItem): Promise<ExchangeItemsList> {
    const cachedList: ExchangeItemsList = await this.cacheManager.get(
      CACHE_KEY,
    );
    let list = cachedList;

    if (
      !GetExchangeItemHandler.isQueryRetrievableFromCache(query, cachedList)
    ) {
      list = await this.exchangeService.getAll();

      await this.cacheManager.set(CACHE_KEY, list, CACHE_TTL);
    }

    return list;
  }

  private static isQueryRetrievableFromCache(
    query: GetExchangeItem,
    cachedList?: ExchangeItemsList,
  ) {
    const cachedTimestamp = cachedList?.timestamp || 0;
    const referenceDate = query.forDate;
    referenceDate.setHours(0, 0, 0);
    const referenceTimestamp = parseInt(
      (referenceDate.getTime() / 1e3) as any,
      10,
    );

    return cachedTimestamp >= referenceTimestamp;
  }
}
