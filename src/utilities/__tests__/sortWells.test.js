import { sortWells } from '../sortWells';

describe('Sort array of wells', () => {
  const wells = [
    { id: '2-A1', label: 'A1' },
    { id: '1-A10', label: 'A10' },
    { id: '1-A11', label: 'A11' },
    { id: '1-A12', label: 'A12' },
    { id: '1-A2', label: 'A2' },
    { id: '1-A3', label: 'A3' },
    { id: '1-A4', label: 'A4' },
    { id: '1-B10', label: 'B10' },
    { id: '1-B2', label: 'B2' },
    { id: '1-F1', label: 'F1' },
    { id: '1-F12', label: 'F12' },
    { id: '1-F3', label: 'F3' },
  ];

  it('Sort the regarding its alphanumeric identifier', () => {
    sortWells(wells);
    expect(wells).toStrictEqual([
      { id: '1-A2', label: 'A2' },
      { id: '1-A3', label: 'A3' },
      { id: '1-A4', label: 'A4' },
      { id: '1-A10', label: 'A10' },
      { id: '1-A11', label: 'A11' },
      { id: '1-A12', label: 'A12' },
      { id: '1-B2', label: 'B2' },
      { id: '1-B10', label: 'B10' },
      { id: '1-F1', label: 'F1' },
      { id: '1-F3', label: 'F3' },
      { id: '1-F12', label: 'F12' },
      { id: '2-A1', label: 'A1' },
    ]);
  });

  it('Sort the regarding its alphanumeric label', () => {
    sortWells(wells, { path: 'label' });
    expect(wells).toStrictEqual([
      { id: '2-A1', label: 'A1' },
      { id: '1-A2', label: 'A2' },
      { id: '1-A3', label: 'A3' },
      { id: '1-A4', label: 'A4' },
      { id: '1-A10', label: 'A10' },
      { id: '1-A11', label: 'A11' },
      { id: '1-A12', label: 'A12' },
      { id: '1-B2', label: 'B2' },
      { id: '1-B10', label: 'B10' },
      { id: '1-F1', label: 'F1' },
      { id: '1-F3', label: 'F3' },
      { id: '1-F12', label: 'F12' },
    ]);
  });
});
