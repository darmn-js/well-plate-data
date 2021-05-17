/* eslint-disable jest/no-try-expect */
import { checkReagents } from '../checkReagents';
import { Well } from '../well';

describe('test get random id function', () => {

  const well = new Well({
    id: '1-A1',
    plate: '1',
    label: 'A1',
    _highlight: 0,
  })

  it('References missing in the reagent object', () => {
    const reagent = [
      {
        label: 'reagent1',
        batch: 'reagent1',
        uuid: 1,
        concentration: 0,
      },
    ];

    well.addReagents(reagent);

    try {
      checkReagents(well);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property REFERENCE not defined for reagent1 at 1-A1',
      );
    }
  });

  it('Batch missing in the reagent object', () => {
    const reagent = [
      {
        label: 'reagent1',
        reference: 'reference1',
        uuid: 1,
        concentration: 0,
      },
    ];

    well.addReagents(reagent);

    try {
      checkReagents(well);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property BATCH not defined for reagent1 at 1-A1',
      );
    }
  });

  it('Uuid missing in the reagent object', () => {
    const reagent = [
      {
        label: 'reagent1',
        reference: 'reference1',
        batch: 'reagent1',
        concentration: 0,
      },
    ];

    well.addReagents(reagent);

    try {
      checkReagents(well);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property UUID not defined for reagent1 at 1-A1',
      );
    }
  });

  it('Concentration missing in the reagent object', () => {
    const reagent = [
      {
        label: 'reagent1',
        reference: 'reference1',
        batch: 'reagent1',
        uuid: 1,
      },
    ];

    well.addReagents(reagent);

    try {
      checkReagents(well);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property CONCENTRATION not defined for reagent1 at 1-A1',
      );
    }
  });
});
