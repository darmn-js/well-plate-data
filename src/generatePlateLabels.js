export function generatePlateLabels(options = {}) {
  let {
    nbRows = 'h',
    nbColumns = '12',
    nbPlates = 1,
    initPlate = 0,
    accountPreviousWells = false,
    direction = 'horizontal',
  } = options;

  let entries = Object.entries({
    rows: nbRows,
    columns: nbColumns,
  });

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
