import { ExchangeItemId } from '../dto/ExchangeItem';

export class AddItemToZombie {
  constructor(private zombieId: string, private itemId: ExchangeItemId) {}

  public getZombieId(): string {
    return this.zombieId;
  }

  public getItemId(): ExchangeItemId {
    return this.itemId;
  }
}
