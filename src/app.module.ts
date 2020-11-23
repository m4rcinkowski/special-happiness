import { Module } from '@nestjs/common';
import { ZombiesModule } from './zombies/zombies.module';

@Module({
  imports: [ZombiesModule],
})
export class AppModule {}
