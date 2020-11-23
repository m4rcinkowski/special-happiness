import { ZombieRepository } from './ZombieRepository';
import { Zombie } from '../domain/Zombie';
import { CreateZombieDto } from '../dto/CreateZombieDto';
import { UpdateZombieDto } from '../dto/UpdateZombieDto';

export class InMemoryZombieRepository extends ZombieRepository {
  private items: Zombie[] = [];

  async getById(id: string): Promise<Zombie> {
    return this.items.find((item) => id === item.getId());
  }

  async getAll(): Promise<Zombie[]> {
    return this.items;
  }

  async create(id: string, payload: CreateZombieDto): Promise<void> {
    const { name, createdAt } = payload;
    const newItem = new Zombie(id, name, createdAt);

    this.items.push(newItem);
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => id !== item.getId());
  }

  async update(id: string, payload: UpdateZombieDto): Promise<void> {
    const { name, createdAt } = payload;
    const newItem = new Zombie(id, name, createdAt);

    this.items = this.items.filter((item) => id !== item.getId());
    this.items.push(newItem);
  }
}
