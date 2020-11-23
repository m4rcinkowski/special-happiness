import { CreateZombieDto } from '../dto/CreateZombieDto';
import { UpdateZombieDto } from '../dto/UpdateZombieDto';
import { Zombie } from '../domain/Zombie';

export abstract class ZombieRepository {
  abstract getById(id: string): Promise<Zombie>;
  abstract getAll(): Promise<Zombie[]>;
  abstract create(id: string, payload: CreateZombieDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, payload: UpdateZombieDto): Promise<void>;
}
