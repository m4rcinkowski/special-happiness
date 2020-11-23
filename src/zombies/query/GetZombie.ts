import { IQuery } from '@nestjs/cqrs';

export class GetZombie implements IQuery {
  constructor(public id: string) {}
}
