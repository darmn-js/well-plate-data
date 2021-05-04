/* eslint-disable jest/no-try-expect */
import { checkReagents } from '../checkReagents';

describe('test get random id function', () => {
  it('References missing in the reagent object', () => {
    const reagent = [
      {
        batch: 'reagent1',
        uuid: 1,
        concentration: 0,
      },
    ];
    try {
      checkReagents(reagent);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property REFERENCE not defined in reagent 0',
      );
    }
  });

  it('Batch missing in the reagent object', () => {
    const reagent = [
      {
        reference: 'reference1',
        uuid: 1,
        concentration: 0,
      },
    ];
    try {
      checkReagents(reagent);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property BATCH not defined in reagent 0',
      );
    }
  });

  it('Uuid missing in the reagent object', () => {
    const reagent = [
      {
        reference: 'reference1',
        batch: 'reagent1',
        concentration: 0,
      },
    ];
    try {
      checkReagents(reagent);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property UUID not defined in reagent 0',
      );
    }
  });

  it('Concentration missing in the reagent object', () => {
    const reagent = [
      {
        reference: 'reference1',
        batch: 'reagent1',
        uuid: 1,
      },
    ];
    try {
      checkReagents(reagent);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        'Property CONCENTRATION not defined in reagent 0',
      );
    }
  });
});
