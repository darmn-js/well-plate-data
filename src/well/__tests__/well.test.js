import { Well } from '../well';

describe('Spectrum', () => {
  const testWell = new Well('A1', { metadata: { time: 1233 } });
  let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let y = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100];

  it('add growth curve to the well', () => {
    testWell.addGrowthCurve({ x, y });
    expect(testWell.growthCurve.x).toHaveLength(11);
    expect(testWell.growthCurve.y).toHaveLength(11);
  });

  it('get growth curve to the well', () => {
    const curve = testWell.getGrowthCurve();
    expect(curve.x).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(curve.y).toStrictEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
  });

  it('add spectrum to the well', () => {
    testWell.addSpectrum({ x, y });
    expect(testWell.spectrum.x).toHaveLength(11);
    expect(testWell.spectrum.y).toHaveLength(11);
  });

  it('get spectrum to the well', () => {
    const spectrum = testWell.getSpectrum();
    expect(spectrum.x).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(spectrum.y).toStrictEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
  });

  it('get metadata related to the well', () => {
    const metadata = testWell.getMetadata();
    expect(metadata).toStrictEqual({ time: 1233 });
  });

  it('get id of the well', () => {
    const id = testWell.getID();
    expect(id).toBeDefined();
  });

  it('get label of the well', () => {
    const label = testWell.getLabel();
    expect(label).toStrictEqual('A1');
  });
});
