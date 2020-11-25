import { IQuery } from '@nestjs/cqrs';

export class GetExchangeItem implements IQuery {
  constructor(
    public readonly id: number,
    public readonly forDate: Date = new Date(),
  ) {}
}
