import { ListZombiesHandler } from './ListZombiesHandler';
import { GetZombieHandler } from './GetZombieHandler';
import { ListZombieItemsHandler } from './ListZombieItemsHandler';
import { GetExchangeItemHandler } from './GetExchangeItemHandler';

export const QueryHandlers = [
  GetZombieHandler,
  ListZombiesHandler,
  ListZombieItemsHandler,
  GetExchangeItemHandler,
];
