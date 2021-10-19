import { generatePlateLabels } from '../generatePlateLabels';

describe('1 Plate of 96 wells (H x 12) horizontal direction', () => {
  const plate1x96Wells = generatePlateLabels();
  it('check axis', () => {
    expect(plate1x96Wells.axis[0][1]).toStrictEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ]);

    expect(plate1x96Wells.axis[1][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate1x96Wells.labelsList).toHaveLength(96);
  });

  it('Well positions', () => {
    expect(plate1x96Wells.labelsList[0]).toBe('1-A1');
    expect(plate1x96Wells.labelsList[1]).toBe('1-A2');
    expect(plate1x96Wells.labelsList[2]).toBe('1-A3');
    expect(plate1x96Wells.labelsList[3]).toBe('1-A4');
    expect(plate1x96Wells.labelsList[4]).toBe('1-A5');
    expect(plate1x96Wells.labelsList[5]).toBe('1-A6');
    expect(plate1x96Wells.labelsList[6]).toBe('1-A7');
    expect(plate1x96Wells.labelsList[7]).toBe('1-A8');
    expect(plate1x96Wells.labelsList[8]).toBe('1-A9');
    expect(plate1x96Wells.labelsList[9]).toBe('1-A10');
    expect(plate1x96Wells.labelsList[10]).toBe('1-A11');
    expect(plate1x96Wells.labelsList[11]).toBe('1-A12');
    expect(plate1x96Wells.labelsList[12]).toBe('1-B1');
    expect(plate1x96Wells.labelsList[24]).toBe('1-C1');
    expect(plate1x96Wells.labelsList[36]).toBe('1-D1');
    expect(plate1x96Wells.labelsList[48]).toBe('1-E1');
    expect(plate1x96Wells.labelsList[60]).toBe('1-F1');
    expect(plate1x96Wells.labelsList[72]).toBe('1-G1');
    expect(plate1x96Wells.labelsList[84]).toBe('1-H1');
  });
});

describe('1 Plate of 96 wells (H x 12) vertical direction', () => {
  const plate1x96Wells = generatePlateLabels({ direction: 'vertical' });
  it('check axis', () => {
    expect(plate1x96Wells.axis[0][1]).toStrictEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ]);

    expect(plate1x96Wells.axis[1][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate1x96Wells.labelsList).toHaveLength(96);
  });

  it('Well positions', () => {
    expect(plate1x96Wells.labelsList[0]).toBe('1-A1');
    expect(plate1x96Wells.labelsList[1]).toBe('1-A2');
    expect(plate1x96Wells.labelsList[2]).toBe('1-A3');
    expect(plate1x96Wells.labelsList[3]).toBe('1-A4');
    expect(plate1x96Wells.labelsList[4]).toBe('1-A5');
    expect(plate1x96Wells.labelsList[5]).toBe('1-A6');
    expect(plate1x96Wells.labelsList[6]).toBe('1-A7');
    expect(plate1x96Wells.labelsList[7]).toBe('1-A8');
    expect(plate1x96Wells.labelsList[8]).toBe('1-A9');
    expect(plate1x96Wells.labelsList[9]).toBe('1-A10');
    expect(plate1x96Wells.labelsList[10]).toBe('1-A11');
    expect(plate1x96Wells.labelsList[11]).toBe('1-A12');
    expect(plate1x96Wells.labelsList[12]).toBe('1-B1');
    expect(plate1x96Wells.labelsList[24]).toBe('1-C1');
    expect(plate1x96Wells.labelsList[36]).toBe('1-D1');
    expect(plate1x96Wells.labelsList[48]).toBe('1-E1');
    expect(plate1x96Wells.labelsList[60]).toBe('1-F1');
    expect(plate1x96Wells.labelsList[72]).toBe('1-G1');
    expect(plate1x96Wells.labelsList[84]).toBe('1-H1');
  });
});

describe('1 Plate of 96 wells (12 x H)', () => {
  const plate1x96Wells = generatePlateLabels({ nbRows: 12, nbColumns: 'H' });
  it('check axis', () => {
    expect(plate1x96Wells.axis[0][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);

    expect(plate1x96Wells.axis[1][1]).toStrictEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ]);
  });

  it('check labelsList length', () => {
    expect(plate1x96Wells.labelsList).toHaveLength(96);
  });

  it('Well positions', () => {
    expect(plate1x96Wells.labelsList[0]).toBe('1-A1');
    expect(plate1x96Wells.labelsList[1]).toBe('1-B1');
    expect(plate1x96Wells.labelsList[2]).toBe('1-C1');
    expect(plate1x96Wells.labelsList[3]).toBe('1-D1');
    expect(plate1x96Wells.labelsList[4]).toBe('1-E1');
    expect(plate1x96Wells.labelsList[5]).toBe('1-F1');
    expect(plate1x96Wells.labelsList[6]).toBe('1-G1');
    expect(plate1x96Wells.labelsList[7]).toBe('1-H1');
    expect(plate1x96Wells.labelsList[8]).toBe('1-A2');
    expect(plate1x96Wells.labelsList[16]).toBe('1-A3');
    expect(plate1x96Wells.labelsList[24]).toBe('1-A4');
    expect(plate1x96Wells.labelsList[32]).toBe('1-A5');
    expect(plate1x96Wells.labelsList[40]).toBe('1-A6');
    expect(plate1x96Wells.labelsList[48]).toBe('1-A7');
    expect(plate1x96Wells.labelsList[56]).toBe('1-A8');
    expect(plate1x96Wells.labelsList[64]).toBe('1-A9');
    expect(plate1x96Wells.labelsList[72]).toBe('1-A10');
    expect(plate1x96Wells.labelsList[80]).toBe('1-A11');
    expect(plate1x96Wells.labelsList[88]).toBe('1-A12');
  });
});

describe('2 Plate of 96 wells (H x 12)', () => {
  const plate2x96Wells = generatePlateLabels({ nbPlates: 2 });
  it('check axis', () => {
    expect(plate2x96Wells.axis[0][1]).toStrictEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ]);

    expect(plate2x96Wells.axis[1][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate2x96Wells.labelsList).toHaveLength(192);
  });

  it('Well positions', () => {
    expect(plate2x96Wells.labelsList[0]).toBe('1-A1');
    expect(plate2x96Wells.labelsList[1]).toBe('1-A2');
    expect(plate2x96Wells.labelsList[2]).toBe('1-A3');
    expect(plate2x96Wells.labelsList[3]).toBe('1-A4');
    expect(plate2x96Wells.labelsList[4]).toBe('1-A5');
    expect(plate2x96Wells.labelsList[5]).toBe('1-A6');
    expect(plate2x96Wells.labelsList[6]).toBe('1-A7');
    expect(plate2x96Wells.labelsList[7]).toBe('1-A8');
    expect(plate2x96Wells.labelsList[8]).toBe('1-A9');
    expect(plate2x96Wells.labelsList[9]).toBe('1-A10');
    expect(plate2x96Wells.labelsList[10]).toBe('1-A11');
    expect(plate2x96Wells.labelsList[11]).toBe('1-A12');
    expect(plate2x96Wells.labelsList[12]).toBe('1-B1');
    expect(plate2x96Wells.labelsList[24]).toBe('1-C1');
    expect(plate2x96Wells.labelsList[36]).toBe('1-D1');
    expect(plate2x96Wells.labelsList[48]).toBe('1-E1');
    expect(plate2x96Wells.labelsList[60]).toBe('1-F1');
    expect(plate2x96Wells.labelsList[72]).toBe('1-G1');
    expect(plate2x96Wells.labelsList[84]).toBe('1-H1');
    expect(plate2x96Wells.labelsList[96]).toBe('2-A1');
    expect(plate2x96Wells.labelsList[108]).toBe('2-B1');
    expect(plate2x96Wells.labelsList[191]).toBe('2-H12');
  });
});

describe('1 Plate of 100 wells (10 x 10) horizontal direction', () => {
  const plate10x10Wells = generatePlateLabels({ nbRows: 10, nbColumns: 10 });
  it('check axis', () => {
    expect(plate10x10Wells.axis[0][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);

    expect(plate10x10Wells.axis[1][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate10x10Wells.labelsList).toHaveLength(100);
  });

  it('Well positions', () => {
    expect(plate10x10Wells.labelsList[0]).toBe('1-1');
    expect(plate10x10Wells.labelsList[1]).toBe('1-2');
    expect(plate10x10Wells.labelsList[2]).toBe('1-3');
    expect(plate10x10Wells.labelsList[3]).toBe('1-4');
    expect(plate10x10Wells.labelsList[4]).toBe('1-5');
    expect(plate10x10Wells.labelsList[5]).toBe('1-6');
    expect(plate10x10Wells.labelsList[6]).toBe('1-7');
    expect(plate10x10Wells.labelsList[7]).toBe('1-8');
    expect(plate10x10Wells.labelsList[8]).toBe('1-9');
    expect(plate10x10Wells.labelsList[9]).toBe('1-10');
    expect(plate10x10Wells.labelsList[10]).toBe('1-11');
    expect(plate10x10Wells.labelsList[20]).toBe('1-21');
    expect(plate10x10Wells.labelsList[30]).toBe('1-31');
    expect(plate10x10Wells.labelsList[40]).toBe('1-41');
    expect(plate10x10Wells.labelsList[50]).toBe('1-51');
    expect(plate10x10Wells.labelsList[60]).toBe('1-61');
    expect(plate10x10Wells.labelsList[70]).toBe('1-71');
    expect(plate10x10Wells.labelsList[80]).toBe('1-81');
    expect(plate10x10Wells.labelsList[90]).toBe('1-91');
  });
});

describe('1 Plate of 100 wells (10 x 10) vertical direction', () => {
  const plate10x10Wells = generatePlateLabels({
    nbRows: 10,
    nbColumns: 10,
    direction: 'vertical',
  });
  it('check axis', () => {
    expect(plate10x10Wells.axis[0][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);

    expect(plate10x10Wells.axis[1][1]).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate10x10Wells.labelsList).toHaveLength(100);
  });

  it('Well positions', () => {
    expect(plate10x10Wells.labelsList[0]).toBe('1-1');
    expect(plate10x10Wells.labelsList[1]).toBe('1-11');
    expect(plate10x10Wells.labelsList[2]).toBe('1-21');
    expect(plate10x10Wells.labelsList[3]).toBe('1-31');
    expect(plate10x10Wells.labelsList[4]).toBe('1-41');
    expect(plate10x10Wells.labelsList[5]).toBe('1-51');
    expect(plate10x10Wells.labelsList[6]).toBe('1-61');
    expect(plate10x10Wells.labelsList[7]).toBe('1-71');
    expect(plate10x10Wells.labelsList[8]).toBe('1-81');
    expect(plate10x10Wells.labelsList[9]).toBe('1-91');
    expect(plate10x10Wells.labelsList[10]).toBe('1-2');
    expect(plate10x10Wells.labelsList[20]).toBe('1-3');
    expect(plate10x10Wells.labelsList[30]).toBe('1-4');
    expect(plate10x10Wells.labelsList[40]).toBe('1-5');
    expect(plate10x10Wells.labelsList[50]).toBe('1-6');
    expect(plate10x10Wells.labelsList[60]).toBe('1-7');
    expect(plate10x10Wells.labelsList[70]).toBe('1-8');
    expect(plate10x10Wells.labelsList[80]).toBe('1-9');
    expect(plate10x10Wells.labelsList[90]).toBe('1-10');
  });
});
