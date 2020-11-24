import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ZombiesController } from './zombies.controller';
import { CommandHandlers } from './command';
import { QueryHandlers } from './query';
import { IdGenerator } from '../common/IdGenerator';
import { UuidGenerator } from '../common/UuidGenerator';
import { ZombieRepository } from './repository/ZombieRepository';
import { InMemoryZombieRepository } from './repository/InMemoryZombieRepository';
import { ZombieItemsController } from './zombie-items.controller';
import { ItemsRepository } from './repository/ItemsRepository';
import { InMemoryItemsRepository } from './repository/InMemoryItemsRepository';

@Module({
  imports: [CqrsModule],
  controllers: [ZombiesController, ZombieItemsController],
  providers: [
    {
      provide: IdGenerator,
      useClass: UuidGenerator,
    },
    {
      provide: ZombieRepository,
      useClass: InMemoryZombieRepository,
    },
    {
      provide: ItemsRepository,
      useClass: InMemoryItemsRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ZombiesModule {}
