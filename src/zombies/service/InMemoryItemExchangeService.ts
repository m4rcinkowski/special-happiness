import { ItemExchangeService } from './ItemExchangeService';
import { ExchangeItem } from '../dto/ExchangeItem';
import { ExchangeItemsList } from '../dto/ExchangeItemsList';

export class InMemoryItemExchangeService extends ItemExchangeService {
  constructor(
    private items: ExchangeItem[] = [],
    private timestamp: Date = new Date(),
  ) {
    super();
  }

  async getAll(): Promise<ExchangeItemsList> {
    return {
      timestamp: parseInt((this.timestamp.getTime() / 1e3) as any, 10),
      items: this.items,
    };
  }

  async setItems(items: ExchangeItem[]): Promise<void> {
    this.items = items;
  }

  async setTimestamp(timestamp: Date): Promise<void> {
    this.timestamp = timestamp;
  }
}
