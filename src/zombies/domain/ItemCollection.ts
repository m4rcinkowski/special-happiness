import { Item } from './Item';
import { Price } from './Price';

export class ItemCollection {
  constructor(private items: Item[], private totalValue: Price[]) {}
}
