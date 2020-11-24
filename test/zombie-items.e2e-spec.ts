import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ZombiesModule } from '../src/zombies/zombies.module';
import { RouterModule } from 'nest-router';
import { appRoutes } from '../src/app.routes';
import { ItemsRepository } from '../src/zombies/repository/ItemsRepository';
import { InMemoryItemsRepository } from '../src/zombies/repository/InMemoryItemsRepository';
import { Item } from '../src/zombies/domain/Item';
import { AddItemToZombieDto } from '../src/zombies/dto/AddItemToZombieDto';

describe('ZombieItemsController (e2e)', () => {
  let app: INestApplication;
  let repository: InMemoryItemsRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RouterModule.forRoutes(appRoutes), ZombiesModule],
      providers: [
        {
          provide: ItemsRepository,
          useValue: InMemoryItemsRepository,
        },
      ],
    }).compile();

    repository = moduleFixture.get<ItemsRepository, InMemoryItemsRepository>(
      ItemsRepository,
    );
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Returns a JSON response', () => {
    return request(app.getHttpServer())
      .get('/zombies/e3917c4e-29c9-4ad1-9b20-c3fe6b7dc2a1/items')
      .expect('content-type', /application\/json/);
  });

  it("Should return a list of zombie's items", async () => {
    const initialItems = new Map();
    initialItems.set('1c67439f-f1e7-474b-b183-16a6b5497f90', [
      new Item(42, 'Axe', 100),
    ]);

    await repository.setItems(initialItems);

    return request(app.getHttpServer())
      .get('/zombies/1c67439f-f1e7-474b-b183-16a6b5497f90/items')
      .expect(200)
      .expect((response) => (response.body as Item[]).length === 1);
  });

  it('Should delete an item from a zombie', async () => {
    const initialItems = new Map();
    initialItems.set('3904e49f-06b4-4208-a8b7-36d2fa4a623e', [
      new Item(42, 'Axe', 100),
    ]);

    await repository.setItems(initialItems);

    await request(app.getHttpServer())
      .delete('/zombies/3904e49f-06b4-4208-a8b7-36d2fa4a623e/items/42')
      .expect(204);

    expect(
      await repository.getAll('3904e49f-06b4-4208-a8b7-36d2fa4a623e'),
    ).toHaveLength(0);
  });

  it("Should successfully ad an item to zombie's inventory", async () => {
    await request(app.getHttpServer())
      .post('/zombies/58f2e892-5425-4c68-8ec8-907c9c4161f2/items')
      .send({
        exchangeItemId: 42,
      } as AddItemToZombieDto)
      .expect(201);

    const items = await repository.getAll(
      '58f2e892-5425-4c68-8ec8-907c9c4161f2',
    );
    expect(items).toHaveLength(1);
    expect(items.shift()).toMatchObject({ id: 42 });
  });
});
