import { Injectable } from '@nestjs/common';
import { Item } from '../domain/Item';
import { Price } from '../domain/Price';
import { CurrencyRateService } from './CurrencyRateService';

@Injectable()
export class TotalValueCalculationService {
  constructor(private readonly currencyService: CurrencyRateService) {}

  public async getTotalValues(items: Item[]): Promise<Price[]> {
    let plnSum = items.reduce(
      (previousValue, currentValue) =>
        previousValue + parseInt((currentValue.price * 100) as any, 10),
      0,
    );
    plnSum /= 100;

    return [
      new Price('PLN', plnSum),
      new Price(
        'EUR',
        plnSum * (await this.currencyService.getRateForCurrency('EUR')),
      ),
      new Price(
        'USD',
        plnSum * (await this.currencyService.getRateForCurrency('USD')),
      ),
    ];
  }
}
