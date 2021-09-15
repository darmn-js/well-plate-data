import { grubbs } from '../grubbs';

describe('test grubbs function', () => {
  let testValues = [0.026, 0.025, 0.016];
  it('should return 42', () => {
    expect(grubbs(testValues)[0]).toBeCloseTo(0.6657);
    expect(grubbs(testValues)[1]).toBeCloseTo(0.4841);
    expect(grubbs(testValues)[2]).toBeCloseTo(1.1499);
  });
});