import { ItemsRepository } from './ItemsRepository';
import { Item } from '../domain/Item';

const ITEMS_LIMIT = 5;

type Items = Map<string, Item[]>;

export class InMemoryItemsRepository extends ItemsRepository {
  constructor(private items: Items = new Map()) {
    super();
  }

  async create(parentId: string, item: Item): Promise<void> {
    const items = this.items.get(parentId) || [];

    if (items.length === ITEMS_LIMIT) {
      throw new Error('Maximum count of items reached');
    }

    items.push(item);
    this.items.set(parentId, items);
  }

  async delete(parentId: string, id: number): Promise<void> {
    let items = this.items.get(parentId);
    items = items.filter((item) => item.id !== id);
    this.items.set(parentId, items);
  }

  async getAll(parentId: string): Promise<Item[]> {
    let items = [];

    if (this.items.has(parentId)) {
      items = this.items.get(parentId);
    }

    return items;
  }

  setItems(items: Items) {
    this.items = items;
  }
}
