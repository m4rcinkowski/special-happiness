import { Routes } from 'nest-router';
import { ZombiesModule } from './zombies/zombies.module';

export const appRoutes: Routes = [
  {
    path: '/zombies',
    module: ZombiesModule,
  },
];
