import { AggregateRoot } from '@nestjs/cqrs';
import { UnprocessableEntityException } from '@nestjs/common';

export class Zombie extends AggregateRoot {
  constructor(
    private id: string,
    private name: string,
    private createdAt: string,
  ) {
    super();
    this.validate();
  }

  validate(): void {
    if (!this.name || !this.createdAt) {
      throw new UnprocessableEntityException();
    }

    if (this.name.length < 3) {
      throw new UnprocessableEntityException(
        'Name must contain at least three letters.',
      );
    }
  }

  public getId(): string {
    return this.id;
  }
}
