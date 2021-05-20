import { averageArrays } from '../averageArrays';

describe('test average of arrays', () => {
    const axis = new Array(10).fill().map((value, index) => index)
    const one = new Array(10).fill(1);
    const two = new Array(10).fill(2);
    const three = new Array(10).fill(3);
    const arrays = ([
        { x: undefined, y: undefined },
        { x: [], y: [] },
        { x: axis, y: one },
        { x: axis, y: two },
        { x: axis, y: three },
    ]);

    it('test arrays average with undefined values', () => {
        const averagedArray = averageArrays(arrays);
        expect(averagedArray).toStrictEqual({
            x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            y: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        })
    })
});