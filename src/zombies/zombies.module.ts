import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ZombiesController } from './zombies.controller';
import { CommandHandlers } from './command';
import { QueryHandlers } from './query';
import { IdGenerator } from '../common/IdGenerator';
import { UuidGenerator } from '../common/UuidGenerator';
import { ZombieRepository } from './repository/ZombieRepository';
import { InMemoryZombieRepository } from './repository/InMemoryZombieRepository';

@Module({
  imports: [CqrsModule],
  controllers: [ZombiesController],
  providers: [
    {
      provide: IdGenerator,
      useClass: UuidGenerator,
    },
    {
      provide: ZombieRepository,
      useClass: InMemoryZombieRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ZombiesModule {}
