import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { appRoutes } from './app.routes';
import { ZombiesModule } from './zombies/zombies.module';

@Module({
  imports: [RouterModule.forRoutes(appRoutes), ZombiesModule],
})
export class AppModule {}
