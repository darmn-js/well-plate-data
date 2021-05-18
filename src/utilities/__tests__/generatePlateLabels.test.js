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
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate1x96Wells.labelsList).toHaveLength(96);
  });

  it('Well positions', () => {
    expect(plate1x96Wells.labelsList[0]).toStrictEqual('1-A1');
    expect(plate1x96Wells.labelsList[1]).toStrictEqual('1-A2');
    expect(plate1x96Wells.labelsList[2]).toStrictEqual('1-A3');
    expect(plate1x96Wells.labelsList[3]).toStrictEqual('1-A4');
    expect(plate1x96Wells.labelsList[4]).toStrictEqual('1-A5');
    expect(plate1x96Wells.labelsList[5]).toStrictEqual('1-A6');
    expect(plate1x96Wells.labelsList[6]).toStrictEqual('1-A7');
    expect(plate1x96Wells.labelsList[7]).toStrictEqual('1-A8');
    expect(plate1x96Wells.labelsList[8]).toStrictEqual('1-A9');
    expect(plate1x96Wells.labelsList[9]).toStrictEqual('1-A10');
    expect(plate1x96Wells.labelsList[10]).toStrictEqual('1-A11');
    expect(plate1x96Wells.labelsList[11]).toStrictEqual('1-A12');
    expect(plate1x96Wells.labelsList[12]).toStrictEqual('1-B1');
    expect(plate1x96Wells.labelsList[24]).toStrictEqual('1-C1');
    expect(plate1x96Wells.labelsList[36]).toStrictEqual('1-D1');
    expect(plate1x96Wells.labelsList[48]).toStrictEqual('1-E1');
    expect(plate1x96Wells.labelsList[60]).toStrictEqual('1-F1');
    expect(plate1x96Wells.labelsList[72]).toStrictEqual('1-G1');
    expect(plate1x96Wells.labelsList[84]).toStrictEqual('1-H1');
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
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate1x96Wells.labelsList).toHaveLength(96);
  });

  it('Well positions', () => {
    expect(plate1x96Wells.labelsList[0]).toStrictEqual('1-A1');
    expect(plate1x96Wells.labelsList[1]).toStrictEqual('1-A2');
    expect(plate1x96Wells.labelsList[2]).toStrictEqual('1-A3');
    expect(plate1x96Wells.labelsList[3]).toStrictEqual('1-A4');
    expect(plate1x96Wells.labelsList[4]).toStrictEqual('1-A5');
    expect(plate1x96Wells.labelsList[5]).toStrictEqual('1-A6');
    expect(plate1x96Wells.labelsList[6]).toStrictEqual('1-A7');
    expect(plate1x96Wells.labelsList[7]).toStrictEqual('1-A8');
    expect(plate1x96Wells.labelsList[8]).toStrictEqual('1-A9');
    expect(plate1x96Wells.labelsList[9]).toStrictEqual('1-A10');
    expect(plate1x96Wells.labelsList[10]).toStrictEqual('1-A11');
    expect(plate1x96Wells.labelsList[11]).toStrictEqual('1-A12');
    expect(plate1x96Wells.labelsList[12]).toStrictEqual('1-B1');
    expect(plate1x96Wells.labelsList[24]).toStrictEqual('1-C1');
    expect(plate1x96Wells.labelsList[36]).toStrictEqual('1-D1');
    expect(plate1x96Wells.labelsList[48]).toStrictEqual('1-E1');
    expect(plate1x96Wells.labelsList[60]).toStrictEqual('1-F1');
    expect(plate1x96Wells.labelsList[72]).toStrictEqual('1-G1');
    expect(plate1x96Wells.labelsList[84]).toStrictEqual('1-H1');
  });
});

describe('1 Plate of 96 wells (12 x H)', () => {
  const plate1x96Wells = generatePlateLabels({ nbRows: 12, nbColumns: 'H' });
  it('check axis', () => {
    expect(plate1x96Wells.axis[0][1]).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
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
    expect(plate1x96Wells.labelsList[0]).toStrictEqual('1-A1');
    expect(plate1x96Wells.labelsList[1]).toStrictEqual('1-B1');
    expect(plate1x96Wells.labelsList[2]).toStrictEqual('1-C1');
    expect(plate1x96Wells.labelsList[3]).toStrictEqual('1-D1');
    expect(plate1x96Wells.labelsList[4]).toStrictEqual('1-E1');
    expect(plate1x96Wells.labelsList[5]).toStrictEqual('1-F1');
    expect(plate1x96Wells.labelsList[6]).toStrictEqual('1-G1');
    expect(plate1x96Wells.labelsList[7]).toStrictEqual('1-H1');
    expect(plate1x96Wells.labelsList[8]).toStrictEqual('1-A2');
    expect(plate1x96Wells.labelsList[16]).toStrictEqual('1-A3');
    expect(plate1x96Wells.labelsList[24]).toStrictEqual('1-A4');
    expect(plate1x96Wells.labelsList[32]).toStrictEqual('1-A5');
    expect(plate1x96Wells.labelsList[40]).toStrictEqual('1-A6');
    expect(plate1x96Wells.labelsList[48]).toStrictEqual('1-A7');
    expect(plate1x96Wells.labelsList[56]).toStrictEqual('1-A8');
    expect(plate1x96Wells.labelsList[64]).toStrictEqual('1-A9');
    expect(plate1x96Wells.labelsList[72]).toStrictEqual('1-A10');
    expect(plate1x96Wells.labelsList[80]).toStrictEqual('1-A11');
    expect(plate1x96Wells.labelsList[88]).toStrictEqual('1-A12');
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
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate2x96Wells.labelsList).toHaveLength(192);
  });

  it('Well positions', () => {
    expect(plate2x96Wells.labelsList[0]).toStrictEqual('1-A1');
    expect(plate2x96Wells.labelsList[1]).toStrictEqual('1-A2');
    expect(plate2x96Wells.labelsList[2]).toStrictEqual('1-A3');
    expect(plate2x96Wells.labelsList[3]).toStrictEqual('1-A4');
    expect(plate2x96Wells.labelsList[4]).toStrictEqual('1-A5');
    expect(plate2x96Wells.labelsList[5]).toStrictEqual('1-A6');
    expect(plate2x96Wells.labelsList[6]).toStrictEqual('1-A7');
    expect(plate2x96Wells.labelsList[7]).toStrictEqual('1-A8');
    expect(plate2x96Wells.labelsList[8]).toStrictEqual('1-A9');
    expect(plate2x96Wells.labelsList[9]).toStrictEqual('1-A10');
    expect(plate2x96Wells.labelsList[10]).toStrictEqual('1-A11');
    expect(plate2x96Wells.labelsList[11]).toStrictEqual('1-A12');
    expect(plate2x96Wells.labelsList[12]).toStrictEqual('1-B1');
    expect(plate2x96Wells.labelsList[24]).toStrictEqual('1-C1');
    expect(plate2x96Wells.labelsList[36]).toStrictEqual('1-D1');
    expect(plate2x96Wells.labelsList[48]).toStrictEqual('1-E1');
    expect(plate2x96Wells.labelsList[60]).toStrictEqual('1-F1');
    expect(plate2x96Wells.labelsList[72]).toStrictEqual('1-G1');
    expect(plate2x96Wells.labelsList[84]).toStrictEqual('1-H1');
    expect(plate2x96Wells.labelsList[96]).toStrictEqual('2-A1');
    expect(plate2x96Wells.labelsList[108]).toStrictEqual('2-B1');
    expect(plate2x96Wells.labelsList[191]).toStrictEqual('2-H12');
  });
});

describe('1 Plate of 100 wells (10 x 10) horizontal direction', () => {
  const plate10x10Wells = generatePlateLabels({ nbRows: 10, nbColumns: 10 });
  it('check axis', () => {
    expect(plate10x10Wells.axis[0][1]).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);

    expect(plate10x10Wells.axis[1][1]).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate10x10Wells.labelsList).toHaveLength(100);
  });

  it('Well positions', () => {
    expect(plate10x10Wells.labelsList[0]).toStrictEqual('1-1');
    expect(plate10x10Wells.labelsList[1]).toStrictEqual('1-2');
    expect(plate10x10Wells.labelsList[2]).toStrictEqual('1-3');
    expect(plate10x10Wells.labelsList[3]).toStrictEqual('1-4');
    expect(plate10x10Wells.labelsList[4]).toStrictEqual('1-5');
    expect(plate10x10Wells.labelsList[5]).toStrictEqual('1-6');
    expect(plate10x10Wells.labelsList[6]).toStrictEqual('1-7');
    expect(plate10x10Wells.labelsList[7]).toStrictEqual('1-8');
    expect(plate10x10Wells.labelsList[8]).toStrictEqual('1-9');
    expect(plate10x10Wells.labelsList[9]).toStrictEqual('1-10');
    expect(plate10x10Wells.labelsList[10]).toStrictEqual('1-11');
    expect(plate10x10Wells.labelsList[20]).toStrictEqual('1-21');
    expect(plate10x10Wells.labelsList[30]).toStrictEqual('1-31');
    expect(plate10x10Wells.labelsList[40]).toStrictEqual('1-41');
    expect(plate10x10Wells.labelsList[50]).toStrictEqual('1-51');
    expect(plate10x10Wells.labelsList[60]).toStrictEqual('1-61');
    expect(plate10x10Wells.labelsList[70]).toStrictEqual('1-71');
    expect(plate10x10Wells.labelsList[80]).toStrictEqual('1-81');
    expect(plate10x10Wells.labelsList[90]).toStrictEqual('1-91');
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
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);

    expect(plate10x10Wells.axis[1][1]).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);
  });

  it('check labelsList length', () => {
    expect(plate10x10Wells.labelsList).toHaveLength(100);
  });

  it('Well positions', () => {
    expect(plate10x10Wells.labelsList[0]).toStrictEqual('1-1');
    expect(plate10x10Wells.labelsList[1]).toStrictEqual('1-11');
    expect(plate10x10Wells.labelsList[2]).toStrictEqual('1-21');
    expect(plate10x10Wells.labelsList[3]).toStrictEqual('1-31');
    expect(plate10x10Wells.labelsList[4]).toStrictEqual('1-41');
    expect(plate10x10Wells.labelsList[5]).toStrictEqual('1-51');
    expect(plate10x10Wells.labelsList[6]).toStrictEqual('1-61');
    expect(plate10x10Wells.labelsList[7]).toStrictEqual('1-71');
    expect(plate10x10Wells.labelsList[8]).toStrictEqual('1-81');
    expect(plate10x10Wells.labelsList[9]).toStrictEqual('1-91');
    expect(plate10x10Wells.labelsList[10]).toStrictEqual('1-2');
    expect(plate10x10Wells.labelsList[20]).toStrictEqual('1-3');
    expect(plate10x10Wells.labelsList[30]).toStrictEqual('1-4');
    expect(plate10x10Wells.labelsList[40]).toStrictEqual('1-5');
    expect(plate10x10Wells.labelsList[50]).toStrictEqual('1-6');
    expect(plate10x10Wells.labelsList[60]).toStrictEqual('1-7');
    expect(plate10x10Wells.labelsList[70]).toStrictEqual('1-8');
    expect(plate10x10Wells.labelsList[80]).toStrictEqual('1-9');
    expect(plate10x10Wells.labelsList[90]).toStrictEqual('1-10');
  });
});
