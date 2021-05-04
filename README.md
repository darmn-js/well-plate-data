# well-plate-data

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

## Introduction

This tool allows to arrange and handle the large amount of data generated in well plates experiments. The main purpose is to read and store the raw data and make easier their manipulation.

## Installation

`$ npm i well-plate-data`

## Arguments

**Options**

* `nbRows`: [number or string (default = 'h')] Indicates the number of rows that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
* `nbColumns`: [number or string (default = 12)] Indicates the number of rows that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
* `nbPlates`: [number (default = 1)] Indicates the number of plates to be generated.
* `initPlate`: [number (default = 0)] It referes the plate where the experiment began.
* `accountPreviousWells`: [boolean (default = false)] For plates where the well label is a number, this option allows to take in count previous labels in the next plate.
* `direction`: [string (default = 'horizontal')] For plates where the well label is a number, this option sets the direction in which this will increase.

## Usage

```js
import { WellPlateData } from 'well-plate-data';
const plate96Wells = new WellPlateData();

// console.log(plate96Wells.wells[95])
// Well {
//     id: 'fdup6hQwhsJkUIReWaHgcSobp',
//     label: 'H12',
//     plate: '1',
//     results: [],
//     metadata: {},
//     reagents: [],
//     growthCurve: { x: [], y: [] },
//     spectrum: { x: [], y: [] }
// }

plate100Wells = new WellPlateData({
    nbPlates: 2,
    nbRows: 10,
    nbColumns: 10,
    accountPreviousWells: true,
});

// console.log(plate100Wells.wells[100]);
// Well {
//     id: 'hpC4arBkN3wnJRY0oCPcCkiGH',
//     label: '101',
//     plate: '2',
//     results: [],
//     metadata: {},
//     reagents: [],
//     growthCurve: { x: [], y: [] },
//     spectrum: { x: [], y: [] }
// }

```

## [API Documentation](https://josoriom.github.io/well-plate-data/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/well-plate-data.svg
[npm-url]: https://www.npmjs.com/package/well-plate-data
[ci-image]: https://github.com/josoriom/well-plate-data/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/josoriom/well-plate-data/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/josoriom/well-plate-data.svg
[codecov-url]: https://codecov.io/gh/josoriom/well-plate-data
[download-image]: https://img.shields.io/npm/dm/well-plate-data.svg
[download-url]: https://www.npmjs.com/package/well-plate-data
