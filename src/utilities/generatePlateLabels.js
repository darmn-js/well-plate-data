/**
 * Returns an array of labels as strings
 * @param {object} [options={}]
 * @param {string} [options.nbRows] - Indicates the number of rows that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
 * @param {string} [options.nbColumns] - Indicates the number of columns that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
 * @param {number} [options.nbPlates] - Indicates the number of plates to be generated.
 * @param {number} [options.initPlate] - It referes the plate where the experiment began.
 * @param {boolean} [options.accountPreviousWells] - For plates where the well label is a number, this option allows to take in count previous labels in the next plate.
 * @param {string} [options.direction] - For plates where the well label is a number, this option sets the direction in which this will increase.
 * @return {Object} {labelsList, axis }
 */

export function generatePlateLabels(options = {}) {
  let {
    nbRows = 'h',
    nbColumns = '12',
    nbPlates = 1,
    initPlate = 0,
    accountPreviousWells = false,
    direction = 'horizontal',
  } = options;

  let entries = Object.entries({ rows: nbRows, columns: nbColumns });

  for (let i = 0; i < entries.length; i++) {
    if (Number.isNaN(parseInt(entries[i][1], 10))) {
      let label = entries[i][1].toUpperCase().charCodeAt(0);
      let axis = new Array(label - 64)
        .fill()
        .map((item, index) => String.fromCharCode(index + 65));
      entries[i][1] = axis;
    } else {
      let axis = new Array(parseInt(entries[i][1], 10))
        .fill()
        .map((item, index) => index + 1);
      entries[i][1] = axis;
    }
  }
  let labelsList = [];
  let [rows, columns] = [entries[0][1], entries[1][1]];
  if (Number.isInteger(rows[0]) && Number.isInteger(columns[0])) {
    let rod = direction === 'vertical' ? rows : columns;
    for (let u = initPlate; u < initPlate + nbPlates; u++) {
      for (let i = 0; i < rows.length; i++) {
        let row = [];
        for (let j = 0; j < columns.length; j++) {
          let [rowIndex, columnIndex] =
            direction === 'vertical' ? [i, j] : [j, i];
          let factor = accountPreviousWells
            ? u * rows.length * columns.length
            : 0;
          row[j] = `${u + 1}-${
            factor + (columnIndex * rod.length + rod[rowIndex])
          }`;
        }
        labelsList.push(...row);
      }
    }
  } else {
    for (let u = initPlate; u < initPlate + nbPlates; u++) {
      for (let i = 0; i < rows.length; i++) {
        let row = [];
        for (let j = 0; j < columns.length; j++) {
          let element =
            typeof rows[i] === 'string'
              ? rows[i] + columns[j]
              : columns[j] + rows[i];
          row[j] = `${u + 1}-${element}`;
        }
        labelsList.push(...row);
      }
    }
  }
  return {
    labelsList: labelsList,
    axis: entries,
  };
}
