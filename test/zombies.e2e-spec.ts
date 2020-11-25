import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ZombiesModule } from '../src/zombies/zombies.module';
import { InMemoryZombieRepository } from '../src/zombies/repository/InMemoryZombieRepository';
import { ZombieRepository } from '../src/zombies/repository/ZombieRepository';
import { Zombie } from '../src/zombies/domain/Zombie';
import { RouterModule } from 'nest-router';
import { appRoutes } from '../src/app.routes';
import { CreateZombieDto } from '../src/zombies/dto/CreateZombieDto';

describe('ZombiesController (e2e)', () => {
  let app: INestApplication;
  let repository: InMemoryZombieRepository;
  const createdAt = new Date('2015-02-24').toISOString();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RouterModule.forRoutes(appRoutes), ZombiesModule],
      providers: [
        {
          provide: ZombieRepository,
          useValue: InMemoryZombieRepository,
        },
      ],
    }).compile();

    repository = moduleFixture.get<ZombieRepository, InMemoryZombieRepository>(
      ZombieRepository,
    );
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Returns a JSON response', () => {
    return request(app.getHttpServer())
      .get('/zombies')
      .expect('content-type', /application\/json/);
  });

  it('Should return a list of zombies', async () => {
    await repository.setItems([
      new Zombie('fae9263f-1afe-422b-953c-d519a8dad35e', 'Kuba', createdAt),
    ]);

    return request(app.getHttpServer())
      .get('/zombies')
      .expect(200)
      .expect([
        {
          id: 'fae9263f-1afe-422b-953c-d519a8dad35e',
          name: 'Kuba',
          createdAt,
        },
      ]);
  });

  it('Should return details of a zombie', async () => {
    await repository.setItems([
      new Zombie('2a092d43-02a2-4790-8867-0f5e9922fe08', 'Kuba', createdAt),
    ]);

    return request(app.getHttpServer())
      .get('/zombies/2a092d43-02a2-4790-8867-0f5e9922fe08')
      .expect(200)
      .expect({
        id: '2a092d43-02a2-4790-8867-0f5e9922fe08',
        name: 'Kuba',
        createdAt,
      });
  });

  it('Should successfully create a zombie', async () => {
    return request(app.getHttpServer())
      .post('/zombies')
      .send({
        name: 'Wojtek',
        createdAt: new Date('2017-09-12').toISOString(),
      } as CreateZombieDto)
      .expect(201);
  });

  it('Should successfully delete a zombie', async () => {
    await repository.setItems([
      new Zombie(
        'fae9263f-1afe-422b-953c-d519a8dad35e',
        'Kuba',
        new Date('2015-02-24').toISOString(),
      ),
    ]);

    return request(app.getHttpServer())
      .delete('/zombies/fae9263f-1afe-422b-953c-d519a8dad35e')
      .expect(204);
  });

  it('Should successfully update a zombie', async () => {
    await repository.setItems([
      new Zombie(
        'b5571da7-7f2d-414e-8dfc-bae92b13a52d',
        'Kuba',
        new Date('2015-02-24').toISOString(),
      ),
    ]);

    return request(app.getHttpServer())
      .put('/zombies/b5571da7-7f2d-414e-8dfc-bae92b13a52d')
      .send({
        name: 'Wojtek',
        createdAt: new Date('2017-09-12').toISOString(),
      } as CreateZombieDto)
      .expect(200);
  });
});
