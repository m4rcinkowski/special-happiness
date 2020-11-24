import { IQuery } from '@nestjs/cqrs';

export class GetExchangeItem implements IQuery {
  constructor(public id: number) {}
}
