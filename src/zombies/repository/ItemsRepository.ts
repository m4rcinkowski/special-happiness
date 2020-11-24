import { Item } from '../domain/Item';

export abstract class ItemsRepository {
  abstract getAll(parentId: string): Promise<Item[]>;

  abstract create(parentId: string, item: Item): Promise<void>;

  abstract delete(parentId: string, id: number): Promise<void>;
}
