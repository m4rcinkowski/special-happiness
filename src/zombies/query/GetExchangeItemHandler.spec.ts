import { Test } from '@nestjs/testing';
import { GetExchangeItemHandler } from './GetExchangeItemHandler';
import { ItemExchangeService } from '../service/ItemExchangeService';
import { InMemoryItemExchangeService } from '../service/InMemoryItemExchangeService';
import { GetExchangeItem } from './GetExchangeItem';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ExchangeItemsList } from '../dto/ExchangeItemsList';

describe('GetExchangeItemHandler', () => {
  let handler: GetExchangeItemHandler;
  let service: InMemoryItemExchangeService;
  let cacheManager: Pick<Cache, 'set' | 'get'>;
  const dateToTimestamp = (date: Date) =>
    parseInt((date.getTime() / 1e3) as any, 10);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetExchangeItemHandler,
        {
          provide: ItemExchangeService,
          useClass: InMemoryItemExchangeService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get(GetExchangeItemHandler);
    service = module.get(ItemExchangeService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('Should return individual item', async () => {
    await service.setItems([{ id: 123, name: 'Super Axe', price: 300 }]);

    const result = await handler.execute(new GetExchangeItem(123));

    expect(result).toMatchObject({ id: 123, name: 'Super Axe', price: 300 });
  });

  it('Should return individual item from the cache when date indicates the same date', async () => {
    await service.setItems([]);
    (cacheManager.get as jest.Mock).mockResolvedValue(<ExchangeItemsList>{
      timestamp: dateToTimestamp(new Date('2015-02-24 00:00:00')),
      items: [{ id: 123, name: 'Super Extra Axe', price: 400 }],
    });

    const result = await handler.execute(
      new GetExchangeItem(123, new Date('2015-02-24 12:00:00')),
    );

    expect(result).toMatchObject({
      id: 123,
      name: 'Super Extra Axe',
      price: 400,
    });
  });

  it('Should return individual item from the service when date indicates a further date', async () => {
    await service.setItems([{ id: 123, name: 'Super Extra Axe', price: 800 }]);
    (cacheManager.get as jest.Mock).mockResolvedValue(<ExchangeItemsList>{
      timestamp: dateToTimestamp(new Date('2015-02-24')),
      items: [{ id: 123, name: 'Super Extra Axe', price: 400 }],
    });

    const result = await handler.execute(
      new GetExchangeItem(123, new Date('2017-09-12')),
    );

    expect(result).toMatchObject({ price: 800 });
  });
});
