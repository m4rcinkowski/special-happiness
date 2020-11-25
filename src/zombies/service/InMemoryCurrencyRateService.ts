import { CurrencyRateService } from './CurrencyRateService';

export class InMemoryCurrencyRateService extends CurrencyRateService {
  constructor(
    private readonly rates = new Map<string, number>([
      ['EUR', 4],
      ['USD', 3],
    ]),
  ) {
    super();
  }
  async getRateForCurrency(currency: string): Promise<number> {
    return this.rates.get(currency.toUpperCase());
  }
}
