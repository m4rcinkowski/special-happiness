export class RemoveItemFromZombie {
  constructor(private zombieId: string, private itemId: number) {}

  public getZombieId(): string {
    return this.zombieId;
  }

  public getItemId(): number {
    return this.itemId;
  }
}
