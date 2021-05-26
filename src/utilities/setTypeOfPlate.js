export function setTypeOfPlate(options = {}) {
  const { nbRows = 'h', nbColumns = '12' } = options;
  const rows = Number.isNaN(parseInt(nbRows, 10))
    ? nbRows.toUpperCase()
    : parseInt(nbRows, 10);
  const columns = Number.isNaN(parseInt(nbColumns, 10))
    ? nbColumns.toUpperCase()
    : parseInt(nbColumns, 10);
  return `${rows}x${columns}`;
}
