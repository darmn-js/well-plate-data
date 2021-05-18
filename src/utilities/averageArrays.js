export function averageArrays(arrays) {
  const data = [];
  for (let array of arrays) {
    if (array.x && array.y && array.y.length) data.push(array);
  }
  if (!data.length) return { x: [], y: [] };
  let result = [];
  let xAxis = data[0].x;
  for (let i = 0; i < data[0].y.length; i++) {
    let variable = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[j].y.length) variable += data[j].y[i];
    }
    result.push(variable / data.length);
  }
  return {
    x: xAxis,
    y: result,
  };
}
