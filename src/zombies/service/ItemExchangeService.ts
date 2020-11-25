import { ExchangeItemsList } from '../dto/ExchangeItemsList';

export abstract class ItemExchangeService {
  abstract getAll(): Promise<ExchangeItemsList>;
}
