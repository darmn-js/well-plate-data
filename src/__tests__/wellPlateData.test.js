import { readFileSync } from 'fs';
import { join } from 'path';

import { parse } from 'papaparse';

import { WellPlateData } from '../wellPlateData';

describe('Plate of 96 wells (H x 12)', () => {
  const plate96Wells = new WellPlateData();
  it('Number of wells = 96', () => {
    expect(plate96Wells.wells).toHaveLength(96);
  });
});

describe('Add reagents to the plate', () => {
  let file = readFileSync(
    join(__dirname, '../testFiles/example_reagents.csv'),
    'utf8',
  );
  file = parse(file, { delimiter: ',', dynamicTyping: true }).data;

  let reagentsExample = [];
  for (let i = 1; i < file.length; i++) {
    if (file[i][0] === null) continue;
    let row = [];
    for (let j = 2; j < file[0].length; j++) {
      row.push({
        reference: `reference${i}`,
        batch: file[0][j],
        uuid: i,
        concentration: file[i][j],
      });
    }
    reagentsExample.push(row);
  }

  const plate96Wells = new WellPlateData();
  plate96Wells.addReagentsFromArray(reagentsExample);
  it('Add reagents array to H x 12 well plate', () => {
    expect(plate96Wells.wells[14].reagents).toStrictEqual([
      {
        batch: 'reagent1',
        concentration: 0,
        reference: 'reference15',
        uuid: 15,
      },
      {
        batch: 'reagent2',
        concentration: 1,
        reference: 'reference15',
        uuid: 15,
      },
      {
        batch: 'reagent3',
        concentration: 0,
        reference: 'reference15',
        uuid: 15,
      },
      {
        batch: 'reagent4',
        concentration: 0,
        reference: 'reference15',
        uuid: 15,
      },
    ]);

    expect(plate96Wells.wells[15].reagents).toStrictEqual([
      {
        batch: 'reagent1',
        concentration: 0,
        reference: 'reference16',
        uuid: 16,
      },
      {
        batch: 'reagent2',
        concentration: 5,
        reference: 'reference16',
        uuid: 16,
      },
      {
        batch: 'reagent3',
        concentration: 0,
        reference: 'reference16',
        uuid: 16,
      },
      {
        batch: 'reagent4',
        concentration: 0,
        reference: 'reference16',
        uuid: 16,
      },
    ]);

    expect(plate96Wells.wells[16].reagents).toStrictEqual([
      {
        batch: 'reagent1',
        concentration: 0,
        reference: 'reference17',
        uuid: 17,
      },
      {
        batch: 'reagent2',
        concentration: 10,
        reference: 'reference17',
        uuid: 17,
      },
      {
        batch: 'reagent3',
        concentration: 0,
        reference: 'reference17',
        uuid: 17,
      },
      {
        batch: 'reagent4',
        concentration: 0,
        reference: 'reference17',
        uuid: 17,
      },
    ]);

    expect(plate96Wells.wells[17].reagents).toStrictEqual([
      {
        batch: 'reagent1',
        concentration: 0,
        reference: 'reference18',
        uuid: 18,
      },
      {
        batch: 'reagent2',
        concentration: 50,
        reference: 'reference18',
        uuid: 18,
      },
      {
        batch: 'reagent3',
        concentration: 0,
        reference: 'reference18',
        uuid: 18,
      },
      {
        batch: 'reagent4',
        concentration: 0,
        reference: 'reference18',
        uuid: 18,
      },
    ]);
  });
});

describe('Add growth curves to the plates', () => {
  let file = readFileSync(
    join(__dirname, '../testFiles/growth_curves_example.csv'),
    'utf8',
  );
  file = parse(file, { delimiter: ',', dynamicTyping: true }).data;
  let xAxis = [];
  for (let j = 3; j < file.length; j++) {
    if (file[j][0] === null) continue;
    let time = file[j][0].split(':');
    let seconds =
      parseInt(time[0], 10) * 3600 +
      parseInt(time[1], 10) * 60 +
      parseInt(time[2], 10);
    xAxis.push(seconds);
  }
  let curves = [];
  for (let i = 1; i < file[0].length; i++) {
    let curve = [];
    for (let j = 3; j < file.length - 1; j++) {
        curve.push(file[j][i])
    }
    let label = file[2][i]
    curves.push({
        label: `${label}`,
        array: { x: xAxis, y: curve}
    })
  }

  const plate100Wells = new WellPlateData({ nbRows: 10, nbColumns: 10 });
  plate100Wells.addGrowthCurvesFromArray(curves);
  it('Add growth curves array to 10 x 10 well plate', () => {
    expect(plate100Wells.wells[0].growthCurve.x).toHaveLength(73);
    expect(plate100Wells.wells[0].growthCurve.y).toHaveLength(73);
    expect(plate100Wells.wells[1].growthCurve.x).toHaveLength(73);
    expect(plate100Wells.wells[1].growthCurve.y).toHaveLength(73);
  });
});

describe('Add spectra to the plates', () => {
  let file = readFileSync(
    join(__dirname, '../testFiles/spectra_example.csv'),
    'utf8',
  );
  file = parse(file, { delimiter: ',', dynamicTyping: true }).data;
  let xAxis = [];
  for (let j = 3; j < file.length; j++) {
    if (file[j][0] === null) continue;
    let time = file[j][0].split(':');
    let seconds =
      parseInt(time[0], 10) * 3600 +
      parseInt(time[1], 10) * 60 +
      parseInt(time[2], 10);
    xAxis.push(seconds);
  }
  let spectra = [];
  for (let i = 1; i < file[0].length; i++) {
    let spectrum = [];
    for (let j = 3; j < file.length - 1; j++) {
      spectrum.push(file[j][i])
    }
    let label = file[2][i]
    spectra.push({
        label: `${label}`,
        array: { x: xAxis, y: spectrum}
    })
  }

  const plate100Wells = new WellPlateData({ nbRows: 10, nbColumns: 10 });
  plate100Wells.addSpectrumFromArray(spectra);
  it('Add spectra array to 10 x 10 well plate', () => {
    expect(plate100Wells.wells[0].spectrum.x).toHaveLength(73);
    expect(plate100Wells.wells[0].spectrum.y).toHaveLength(73);
    expect(plate100Wells.wells[1].spectrum.x).toHaveLength(73);
    expect(plate100Wells.wells[1].spectrum.y).toHaveLength(73);
  });
});

describe('Add results to the plates', () => {
  let file = readFileSync(
    join(__dirname, '../testFiles/results_example.csv'),
    'utf8',
  );

  file = parse(file, { delimiter: ',', dynamicTyping: true }).data;
  let initRow, initCol;

  for (let i = 0; i < file.length - 1; i++) {
    if (file[i][0] === 'A') initRow = i;
  }

  for (let i = 0; i < file[initRow - 1].length; i++) {
    if (file[initRow - 1][i] === 1) initCol = i;
  }

  let parsed = [];
  for (let i = initRow; i < file.length - 3 + initRow; i++) {
    let row = [];
    for (let j = initCol; j < file[1].length - 1 + initCol; j++) {
      row[j - initCol] = parseFloat(file[i][j]);
    }
    parsed.push(...row);
  }

  let plateResults = [];
  for (let i = 0; i < parsed.length; i++) {
    plateResults.push({
      name: 'IC50',
      value: parsed[i],
    });
  }

  const plate96Wells = new WellPlateData();
  plate96Wells.addResultsFromArray(plateResults);
  it('Add spectra array to 10 x 10 well plate', () => {
    expect(plate96Wells.wells[0].results[0]).toStrictEqual({
      name: 'IC50',
      value: 541,
    });
    expect(plate96Wells.wells[24].results[0]).toStrictEqual({
      name: 'IC50',
      value: 43,
    });
    expect(plate96Wells.wells[72].results[0]).toStrictEqual({
      name: 'IC50',
      value: 353,
    });
    expect(plate96Wells.wells[95].results[0]).toStrictEqual({
      name: 'IC50',
      value: 55,
    });
  });
});

describe('Get plate labels', () => {
  const plate100Wells = new WellPlateData({ nbRows: 10, nbColumns: 10 });
  const plate100Labels = plate100Wells.getPlateTemplate();
  it('Get plate labels from 10 x 10 well plate', () => {
    expect(plate100Labels[0]).toStrictEqual({ index: 0, label: '1-1', selected: false, _highlight: 0 });
    expect(plate100Labels[1]).toStrictEqual({ index: 1, label: '1-2', selected: false, _highlight: 1 });
    expect(plate100Labels[98]).toStrictEqual({ index: 98, label: '1-99', selected: false, _highlight: 98 });
    expect(plate100Labels[99]).toStrictEqual({ index: 99, label: '1-100', selected: false, _highlight: 99 });
  });

  const plate96Wells = new WellPlateData();
  const plate96Labels = plate96Wells.getPlateTemplate();
  it('Get plate labels from H x 12 well plate', () => {
    expect(plate96Labels[0]).toStrictEqual({ index: 0, label: '1-A1', selected: false, _highlight: 0 });
    expect(plate96Labels[1]).toStrictEqual({ index: 1, label: '1-A2', selected: false, _highlight: 1 });
    expect(plate96Labels[94]).toStrictEqual({ index: 94, label: '1-H11', selected: false, _highlight: 94 });
    expect(plate96Labels[95]).toStrictEqual({ index: 95, label: '1-H12', selected: false, _highlight: 95 });
  });
});

describe('Get well samples', () => {
  let file = readFileSync(
    join(__dirname, '../testFiles/example_reagents.csv'),
    'utf8',
  );
  file = parse(file, { delimiter: ',', dynamicTyping: true }).data;

  let reagentsExample = [];
  for (let i = 1; i < file.length; i++) {
    if (file[i][0] === null) continue;
    let row = [];
    for (let j = 2; j < file[0].length; j++) {
      row.push({
        reference: `reference${i}`,
        batch: file[0][j],
        uuid: i,
        concentration: file[i][j],
      });
    }
    reagentsExample.push(row);
  }

  const plate96Wells = new WellPlateData();
  plate96Wells.addReagentsFromArray(reagentsExample);
  const samplesIDs = plate96Wells.getSamplesIDs();
  it('Add reagents array to H x 12 well plate', () => {
    expect(samplesIDs).toStrictEqual([
      [
        'A1',
        'A2',
        'A3',
        'A4',
        'A5',
        'A6',
        'A7',
        'A8',
        'A9',
        'A10',
        'A11',
        'A12',
        'B1',
        'B12',
        'C1',
        'C12',
        'D1',
        'D12',
        'E1',
        'E12',
        'F1',
        'F12',
        'G1',
        'G12',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'H7',
        'H8',
        'H9',
        'H10',
        'H11',
        'H12',
      ],
      ['B2', 'C2', 'D2', 'E2', 'F2', 'G2'],
      ['B3', 'C3', 'D3'],
      ['B4', 'C4', 'D4'],
      ['B5', 'C5', 'D5'],
      ['B6', 'C6', 'D6'],
      ['B7', 'C7', 'D7'],
      ['B8', 'C8', 'D8'],
      ['B9', 'B10', 'B11'],
      ['C9', 'C10', 'C11'],
      ['D9', 'D10', 'D11'],
      ['E3', 'F3', 'G3'],
      ['E4', 'F4', 'G4'],
      ['E5', 'F5', 'G5'],
      ['E6', 'F6', 'G6'],
      ['E7', 'F7', 'G7'],
      ['E8', 'F8', 'G8'],
      ['E9', 'E10', 'E11'],
      ['F9', 'F10', 'F11'],
      ['G9', 'G10', 'G11'],
    ]);
  });
});
