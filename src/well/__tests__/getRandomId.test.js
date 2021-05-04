import { getRandomId } from '../getRandomId';

describe('test get random id function', () => {
  it('Get id of default length = 25', () => {
    const randomID = getRandomId();
    expect(randomID).toHaveLength(25);
  });

  it('Get id of length = 30', () => {
    const length = 30;
    const randomID = getRandomId({ length });
    expect(randomID).toHaveLength(length);
  });
});
