export abstract class CurrencyRateService {
  abstract getRateForCurrency(currency: string): Promise<number>;
}
