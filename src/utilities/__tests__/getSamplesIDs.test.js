import { readFileSync } from 'fs';
import { join } from 'path';

import { parse } from 'papaparse';

import { WellPlateData } from '../../wellPlateData';
import { getSamplesIDs } from '../getSamplesIDs';

describe('Get well samples', () => {
  let file = readFileSync(
    join(__dirname, '../../testFiles/example_reagents.csv'),
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
  const samplesIDs = getSamplesIDs(plate96Wells.wells);
  it('Add reagents array to H x 12 well plate', () => {
    expect(samplesIDs).toStrictEqual([
      [
        '1-A1',
        '1-A2',
        '1-A3',
        '1-A4',
        '1-A5',
        '1-A6',
        '1-A7',
        '1-A8',
        '1-A9',
        '1-A10',
        '1-A11',
        '1-A12',
        '1-B1',
        '1-B12',
        '1-C1',
        '1-C12',
        '1-D1',
        '1-D12',
        '1-E1',
        '1-E12',
        '1-F1',
        '1-F12',
        '1-G1',
        '1-G12',
        '1-H1',
        '1-H2',
        '1-H3',
        '1-H4',
        '1-H5',
        '1-H6',
        '1-H7',
        '1-H8',
        '1-H9',
        '1-H10',
        '1-H11',
        '1-H12',
      ],
      ['1-B2', '1-C2', '1-D2', '1-E2', '1-F2', '1-G2'],
      ['1-B3', '1-C3', '1-D3'],
      ['1-B4', '1-C4', '1-D4'],
      ['1-B5', '1-C5', '1-D5'],
      ['1-B6', '1-C6', '1-D6'],
      ['1-B7', '1-C7', '1-D7'],
      ['1-B8', '1-C8', '1-D8'],
      ['1-B9', '1-B10', '1-B11'],
      ['1-C9', '1-C10', '1-C11'],
      ['1-D9', '1-D10', '1-D11'],
      ['1-E3', '1-F3', '1-G3'],
      ['1-E4', '1-F4', '1-G4'],
      ['1-E5', '1-F5', '1-G5'],
      ['1-E6', '1-F6', '1-G6'],
      ['1-E7', '1-F7', '1-G7'],
      ['1-E8', '1-F8', '1-G8'],
      ['1-E9', '1-E10', '1-E11'],
      ['1-F9', '1-F10', '1-F11'],
      ['1-G9', '1-G10', '1-G11'],
    ]);
  });
});
