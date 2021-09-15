import mean from 'ml-array-mean';
import standardDeviation from 'ml-array-standard-deviation';
/**
 * My module
 * @returns A very important number
 */
export function grubbs(values) {
  const meanValue = mean(values);
  const std = standardDeviation(values);
  let result = [];
  for (let value of values) {
    result.push(Math.abs(value - meanValue) / std)
  }
  return result;
}
