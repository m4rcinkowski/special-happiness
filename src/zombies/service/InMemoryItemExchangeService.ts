import { ItemExchangeService } from './ItemExchangeService';
import { ExchangeItem } from '../dto/ExchangeItem';

export class InMemoryItemExchangeService extends ItemExchangeService {
  private items: ExchangeItem[] = [];

  async getAll(): Promise<ExchangeItem[]> {
    return this.items;
  }

  async setItems(items: ExchangeItem[]): Promise<void> {
    this.items = items;
  }
}
