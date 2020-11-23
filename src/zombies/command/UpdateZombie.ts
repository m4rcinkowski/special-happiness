import { UpdateZombieDto } from '../dto/UpdateZombieDto';

export class UpdateZombie {
  constructor(public id: string, public payload: UpdateZombieDto) {}
}
