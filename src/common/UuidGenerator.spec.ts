import * as uuid from 'uuid';
import { UuidGenerator } from './UuidGenerator';

jest.mock('uuid');

describe('UuidGenerator', () => {
  it('Should return an ID as string', () => {
    jest.spyOn(uuid, 'v4').mockReturnValue('dummy-uuid4');
    const generator = new UuidGenerator();

    expect(generator.generateId()).toEqual('dummy-uuid4');
  });
});
