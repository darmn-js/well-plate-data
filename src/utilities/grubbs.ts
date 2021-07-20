import mean from 'ml-array-mean';
import standardDeviation from 'ml-array-standard-deviation';
/**
 * My module
 * @returns A very important number
 */
export function grubbs(values: Array<number>) {
  const meanValue: number = mean(values);
  const std: number = standardDeviation(values);
  let result: Array<number> = [];
  for (let value of values) {
    result.push(Math.abs(value - meanValue) / std)
  }
  return result;
}
