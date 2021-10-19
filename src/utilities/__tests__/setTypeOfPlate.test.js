import { setTypeOfPlate } from '../setTypeOfPlate';

describe('Sort array of wells', () => {
  let type1 = { nbRows: '10', nbColumns: '10' };
  let type2 = { nbRows: 10, nbColumns: 10 };
  let type3 = { nbRows: 'h', nbColumns: '12' };
  let type4 = { nbRows: 'h', nbColumns: 12 };

  it('Sort the regarding its alphanumeric identifier', () => {
    expect(setTypeOfPlate(type1)).toBe('10x10');
    expect(setTypeOfPlate(type2)).toBe('10x10');
    expect(setTypeOfPlate(type3)).toBe('Hx12');
    expect(setTypeOfPlate(type4)).toBe('Hx12');
  });
});
