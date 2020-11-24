import { ExchangeItem } from '../dto/ExchangeItem';

export abstract class ItemExchangeService {
  abstract getAll(): Promise<ExchangeItem[]>;
}
