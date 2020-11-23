import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ZombiesModule } from '../src/zombies/zombies.module';
import { InMemoryZombieRepository } from '../src/zombies/repository/InMemoryZombieRepository';
import { ZombieRepository } from '../src/zombies/repository/ZombieRepository';
import { Zombie } from '../src/zombies/domain/Zombie';

describe('ZombiesController (e2e)', () => {
  let app: INestApplication;
  let repository: InMemoryZombieRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ZombiesModule],
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
      .expect(
        (response) => response.headers['content-type'] === 'application/json',
      );
  });

  it('Returns a list of zombies', async () => {
    await repository.create('fae9263f-1afe-422b-953c-d519a8dad35e', {
      name: 'Kuba',
      createdAt: new Date('2015-02-24').toISOString(),
    });

    return request(app.getHttpServer())
      .get('/zombies')
      .expect(200)
      .expect((response) => (response.body as Zombie[]).length === 1);
  });
});
