import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddItemToZombieDto } from './dto/AddItemToZombieDto';
import { AddItemToZombie } from './command/AddItemToZombie';
import { ListZombieItems } from './query/ListZombieItems';
import { RemoveItemFromZombie } from './command/RemoveItemFromZombie';

@Controller('/')
export class ZombieItemsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':zombieId/items')
  @HttpCode(201)
  create(
    @Param('zombieId') zombieId: string,
    @Body() addItem: AddItemToZombieDto,
  ) {
    return this.commandBus.execute(
      new AddItemToZombie(zombieId, addItem.exchangeItemId),
    );
  }

  @Get(':zombieId/items')
  findAll(@Param('zombieId') id: string) {
    return this.queryBus.execute(new ListZombieItems(id));
  }

  @Delete(':zombieId/items/:itemId')
  @HttpCode(204)
  remove(@Param('zombieId') id: string, @Param('itemId') itemId: number) {
    return this.commandBus.execute(
      new RemoveItemFromZombie(id, parseInt((itemId as any) as string, 10)),
    );
  }
}
