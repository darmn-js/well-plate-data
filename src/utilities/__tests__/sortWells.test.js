import { sortWells } from '../sortWells';

describe('Sort array of wells', () => {
  const wells = [
    { id: '2-A1' },
    { id: '1-A10' },
    { id: '1-A11' },
    { id: '1-A12' },
    { id: '1-A2' },
    { id: '1-A3' },
    { id: '1-A4' },
    { id: '1-B10' },
    { id: '1-B2' },
    { id: '1-F1' },
    { id: '1-F12' },
    { id: '1-F3' },
  ];

  it('Sort the regarding its alphanumeric identifier', () => {
    sortWells(wells);
    expect(wells).toStrictEqual([
      { id: '1-A2' },
      { id: '1-A3' },
      { id: '1-A4' },
      { id: '1-A10' },
      { id: '1-A11' },
      { id: '1-A12' },
      { id: '1-B2' },
      { id: '1-B10' },
      { id: '1-F1' },
      { id: '1-F3' },
      { id: '1-F12' },
      { id: '2-A1' },
    ]);
  });
});
