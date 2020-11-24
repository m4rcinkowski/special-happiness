import { IQuery } from '@nestjs/cqrs';

export class ListZombieItems implements IQuery {
  constructor(private zombieId: string) {}

  public getZombieId(): string {
    return this.zombieId;
  }
}
