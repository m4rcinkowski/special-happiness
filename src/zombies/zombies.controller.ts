import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateZombieDto } from './dto/CreateZombieDto';
import { CreateZombie } from './command/CreateZombie';
import { ListZombies } from './query/ListZombies';
import { GetZombie } from './query/GetZombie';
import { UpdateZombieDto } from './dto/UpdateZombieDto';
import { UpdateZombie } from './command/UpdateZombie';
import { DeleteZombie } from './command/DeleteZombie';

@Controller('/')
export class ZombiesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createZombieDto: CreateZombieDto) {
    return this.commandBus.execute(new CreateZombie(createZombieDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new ListZombies());
  }

  @Get(':zombieId')
  findOne(@Param('zombieId') id: string) {
    return this.queryBus.execute(new GetZombie(id));
  }

  @Put(':zombieId')
  update(
    @Param('zombieId') id: string,
    @Body() updateZombieDto: UpdateZombieDto,
  ) {
    return this.commandBus.execute(new UpdateZombie(id, updateZombieDto));
  }

  @Delete(':zombieId')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteZombie(id));
  }
}
