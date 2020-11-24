import { CreateZombieHandler } from './CreateZombieHandler';
import { UpdateZombieHandler } from './UpdateZombieHandler';
import { DeleteZombieHandler } from './DeleteZombieHandler';
import { AddItemToZombieHandler } from './AddItemToZombieHandler';
import { RemoveItemFromZombieHandler } from './RemoveItemFromZombieHandler';

export const CommandHandlers = [
  CreateZombieHandler,
  UpdateZombieHandler,
  DeleteZombieHandler,
  AddItemToZombieHandler,
  RemoveItemFromZombieHandler,
];
