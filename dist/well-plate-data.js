/**
 * well-plate-data - Well plate data manager
 * @version v0.0.2
 * @link https://github.com/josoriom/well-plate-data#readme
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.wellPlateData = {}));
}(this, (function (exports) { 'use strict';

  const toString = Object.prototype.toString;
  function isAnyArray(object) {
    return toString.call(object).endsWith('Array]');
  }

  function sum(input) {
    if (!isAnyArray(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var sumValue = 0;

    for (var i = 0; i < input.length; i++) {
      sumValue += input[i];
    }

    return sumValue;
  }

  function mean(input) {
    return sum(input) / input.length;
  }

  function variance(values) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!isAnyArray(values)) {
      throw new TypeError('input must be an array');
    }

    var _options$unbiased = options.unbiased,
        unbiased = _options$unbiased === void 0 ? true : _options$unbiased,
        _options$mean = options.mean,
        mean$1 = _options$mean === void 0 ? mean(values) : _options$mean;
    var sqrError = 0;

    for (var i = 0; i < values.length; i++) {
      var x = values[i] - mean$1;
      sqrError += x * x;
    }

    if (unbiased) {
      return sqrError / (values.length - 1);
    } else {
      return sqrError / values.length;
    }
  }

  function standardDeviation(values) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return Math.sqrt(variance(values, options));
  }

  var confidence$1 = {
  	alphas: [
  		0.1,
  		0.075,
  		0.05,
  		0.025,
  		0.01
  	],
  	confidenceLevel: [
  		90,
  		92.5,
  		95,
  		97.5,
  		99
  	],
  	significanceLevel: [
  		10,
  		7.5,
  		5,
  		2.5,
  		1
  	]
  };
  var table$1 = [
  	[
  		1.15,
  		1.15,
  		1.15,
  		1.15,
  		1.15
  	],
  	[
  		1.42,
  		1.44,
  		1.46,
  		1.48,
  		1.49
  	],
  	[
  		1.6,
  		1.64,
  		1.67,
  		1.71,
  		1.75
  	],
  	[
  		1.73,
  		1.77,
  		1.82,
  		1.89,
  		1.94
  	],
  	[
  		1.83,
  		1.88,
  		1.94,
  		2.02,
  		2.1
  	],
  	[
  		1.91,
  		1.96,
  		2.03,
  		2.13,
  		2.22
  	],
  	[
  		1.98,
  		2.04,
  		2.11,
  		2.21,
  		2.32
  	],
  	[
  		2.03,
  		2.1,
  		2.18,
  		2.29,
  		2.41
  	],
  	[
  		2.09,
  		2.14,
  		2.23,
  		2.36,
  		2.48
  	],
  	[
  		2.13,
  		2.2,
  		2.29,
  		2.41,
  		2.55
  	],
  	[
  		2.17,
  		2.24,
  		2.33,
  		2.46,
  		2.61
  	],
  	[
  		2.21,
  		2.28,
  		2.37,
  		2.51,
  		2.66
  	],
  	[
  		2.25,
  		2.32,
  		2.41,
  		2.55,
  		2.71
  	],
  	[
  		2.28,
  		2.35,
  		2.44,
  		2.59,
  		2.75
  	],
  	[
  		2.31,
  		2.38,
  		2.47,
  		2.62,
  		2.79
  	],
  	[
  		2.34,
  		2.41,
  		2.5,
  		2.65,
  		2.82
  	],
  	[
  		2.36,
  		2.44,
  		2.53,
  		2.68,
  		2.85
  	],
  	[
  		2.38,
  		2.46,
  		2.56,
  		2.71,
  		2.88
  	],
  	[
  		0,
  		0,
  		2.58,
  		2.73,
  		2.91
  	],
  	[
  		0,
  		0,
  		2.6,
  		2.76,
  		2.94
  	],
  	[
  		0,
  		0,
  		2.62,
  		2.78,
  		2.96
  	],
  	[
  		0,
  		0,
  		2.64,
  		2.8,
  		2.99
  	],
  	[
  		0,
  		0,
  		2.66,
  		2.82,
  		3.01
  	],
  	[
  		0,
  		0,
  		2.68,
  		2.84,
  		999
  	],
  	[
  		0,
  		0,
  		2.7,
  		2.86,
  		999
  	],
  	[
  		0,
  		0,
  		2.72,
  		2.88,
  		999
  	],
  	[
  		0,
  		0,
  		2.73,
  		2.9,
  		999
  	],
  	[
  		0,
  		0,
  		2.75,
  		2.91,
  		999
  	],
  	[
  		0,
  		0,
  		2.76,
  		2.93,
  		999
  	],
  	[
  		0,
  		0,
  		2.78,
  		2.95,
  		999
  	],
  	[
  		0,
  		0,
  		2.79,
  		2.96,
  		999
  	],
  	[
  		0,
  		0,
  		2.81,
  		2.97,
  		999
  	],
  	[
  		0,
  		0,
  		2.82,
  		2.98,
  		999
  	],
  	[
  		0,
  		0,
  		2.83,
  		2.992,
  		999
  	],
  	[
  		0,
  		0,
  		2.84,
  		3.004,
  		999
  	],
  	[
  		0,
  		0,
  		2.85,
  		3.016,
  		999
  	],
  	[
  		0,
  		0,
  		2.86,
  		3.028,
  		999
  	],
  	[
  		0,
  		0,
  		2.87,
  		3.04,
  		999
  	],
  	[
  		0,
  		0,
  		2.88,
  		3.05,
  		999
  	],
  	[
  		0,
  		0,
  		2.89,
  		3.06,
  		999
  	],
  	[
  		0,
  		0,
  		2.9,
  		3.07,
  		999
  	],
  	[
  		0,
  		0,
  		2.91,
  		3.08,
  		999
  	],
  	[
  		0,
  		0,
  		2.92,
  		3.09,
  		999
  	],
  	[
  		0,
  		0,
  		2.928,
  		3.098,
  		999
  	],
  	[
  		0,
  		0,
  		2.936,
  		3.106,
  		999
  	],
  	[
  		0,
  		0,
  		2.944,
  		3.114,
  		999
  	],
  	[
  		0,
  		0,
  		2.952,
  		3.122,
  		999
  	],
  	[
  		0,
  		0,
  		2.967,
  		3.137,
  		999
  	],
  	[
  		0,
  		0,
  		2.974,
  		3.144,
  		999
  	],
  	[
  		0,
  		0,
  		2.981,
  		3.151,
  		999
  	],
  	[
  		0,
  		0,
  		2.988,
  		3.158,
  		999
  	],
  	[
  		0,
  		0,
  		2.995,
  		3.165,
  		999
  	],
  	[
  		0,
  		0,
  		3.002,
  		3.172,
  		999
  	],
  	[
  		0,
  		0,
  		3.009,
  		3.179,
  		999
  	],
  	[
  		0,
  		0,
  		3.016,
  		3.186,
  		999
  	],
  	[
  		0,
  		0,
  		3.023,
  		3.193,
  		999
  	],
  	[
  		0,
  		0,
  		3.03,
  		3.2,
  		999
  	],
  	[
  		0,
  		0,
  		3.036,
  		3.206,
  		999
  	],
  	[
  		0,
  		0,
  		3.042,
  		3.212,
  		999
  	],
  	[
  		0,
  		0,
  		3.048,
  		3.218,
  		999
  	],
  	[
  		0,
  		0,
  		3.054,
  		3.224,
  		999
  	],
  	[
  		0,
  		0,
  		3.06,
  		3.23,
  		999
  	],
  	[
  		0,
  		0,
  		3.066,
  		3.236,
  		999
  	],
  	[
  		0,
  		0,
  		3.072,
  		3.242,
  		999
  	],
  	[
  		0,
  		0,
  		3.078,
  		3.248,
  		999
  	],
  	[
  		0,
  		0,
  		3.084,
  		3.254,
  		999
  	],
  	[
  		0,
  		0,
  		3.09,
  		3.26,
  		999
  	],
  	[
  		0,
  		0,
  		3.095,
  		3.265,
  		999
  	],
  	[
  		0,
  		0,
  		3.1,
  		3.27,
  		999
  	],
  	[
  		0,
  		0,
  		3.105,
  		3.275,
  		999
  	],
  	[
  		0,
  		0,
  		3.11,
  		3.28,
  		999
  	],
  	[
  		0,
  		0,
  		3.115,
  		3.285,
  		999
  	],
  	[
  		0,
  		0,
  		3.12,
  		3.29,
  		999
  	],
  	[
  		0,
  		0,
  		3.125,
  		3.295,
  		999
  	],
  	[
  		0,
  		0,
  		3.13,
  		3.3,
  		999
  	],
  	[
  		0,
  		0,
  		3.135,
  		3.305,
  		999
  	],
  	[
  		0,
  		0,
  		3.14,
  		3.31,
  		999
  	],
  	[
  		0,
  		0,
  		3.144,
  		3.314,
  		999
  	],
  	[
  		0,
  		0,
  		3.148,
  		3.318,
  		999
  	],
  	[
  		0,
  		0,
  		3.152,
  		3.322,
  		999
  	],
  	[
  		0,
  		0,
  		3.156,
  		3.326,
  		999
  	],
  	[
  		0,
  		0,
  		3.16,
  		3.33,
  		999
  	],
  	[
  		0,
  		0,
  		3.164,
  		3.334,
  		999
  	],
  	[
  		0,
  		0,
  		3.168,
  		3.338,
  		999
  	],
  	[
  		0,
  		0,
  		3.172,
  		3.342,
  		999
  	],
  	[
  		0,
  		0,
  		3.176,
  		3.346,
  		999
  	],
  	[
  		0,
  		0,
  		3.18,
  		3.35,
  		999
  	],
  	[
  		0,
  		0,
  		3.183,
  		3.353,
  		999
  	],
  	[
  		0,
  		0,
  		3.186,
  		3.356,
  		999
  	],
  	[
  		0,
  		0,
  		3.189,
  		3.359,
  		999
  	],
  	[
  		0,
  		0,
  		3.192,
  		3.362,
  		999
  	],
  	[
  		0,
  		0,
  		3.195,
  		3.365,
  		999
  	],
  	[
  		0,
  		0,
  		3.198,
  		3.368,
  		999
  	],
  	[
  		0,
  		0,
  		3.201,
  		3.371,
  		999
  	],
  	[
  		0,
  		0,
  		3.204,
  		3.374,
  		999
  	],
  	[
  		0,
  		0,
  		3.207,
  		3.377,
  		999
  	],
  	[
  		0,
  		0,
  		3.21,
  		3.38,
  		999
  	]
  ];
  var raw = {
  	confidence: confidence$1,
  	table: table$1
  };

  const {
    table,
    confidence
  } = raw;
  /**
   * Grubbs
   * @returns the result of testing an array of values
   */

  function grubbs(values, options = {}) {
    const {
      type = 'alphas',
      value = 0.05
    } = options;
    const meanValue = mean(values);
    const std = standardDeviation(values);
    const test = [];

    if (values.length < 3) {
      for (const value of values) {
        test.push({
          value,
          score: 0,
          pass: undefined
        });
      }

      return {
        criticalValue: undefined,
        test
      };
    }

    const criticalValue = table[values.length - 3][confidence[type].indexOf(value)];

    for (const value of values) {
      const score = Math.abs(value - meanValue) / std;
      test.push({
        value,
        score,
        pass: score > criticalValue ? false : true
      });
    }

    return {
      criticalValue,
      test
    };
  }

  function getRandomId(options = {}) {
    const {
      length = 25
    } = options;
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
  }

  class PlateSample {
    /**
     * @param {String} id - Identificator
     * @param {String} label - Sample label
     * @param {Array}  [wells=[]] - Wells that corresponds to the sample
     * @param {Object} [metadata={}] - Metadata relate to the well
     */
    constructor(options = {}) {
      let {
        id = getRandomId(),
        label = undefined,
        wells = [],
        metadata = {
          color: 'blue',
          display: true,
          category: null,
          group: null
        },
        averagedSpectra = {
          x: [],
          y: []
        },
        averagedGrowthCurves = {
          x: [],
          y: []
        },
        _highlight = getRandomId(),
        analysis = {
          raw: {},
          averaged: [],
          wells: []
        },
        results = {},
        reagents = []
      } = options;
      this.id = id;
      this.label = label;
      this.wells = wells;
      this.metadata = metadata;
      this.results = results;
      this.analysis = analysis;
      this.reagents = reagents;
      this.averagedSpectra = averagedSpectra;
      this.averagedGrowthCurves = averagedGrowthCurves;
      this._highlight = _highlight;
    }

  }

  function addChartStyle(data, well) {
    data.styles = {
      unselected: {
        lineColor: well.metadata.color || 'red',
        lineWidth: 1,
        lineStyle: 1
      },
      selected: {
        lineColor: well.metadata.color || 'red',
        lineWidth: 3,
        lineStyle: 1
      }
    };
    data.label = well.id;
  }

  function averageAnalysis(wells) {
    const keys = Object.keys(wells[0].analysis.processed);
    let result = [];

    for (let key of keys) {
      let average = 0;

      for (let well of wells) {
        average += well.analysis.processed[key];
      }

      result.push({
        label: key,
        value: average / wells.length
      });
    }

    return result;
  }

  function averageArrays(arrays) {
    const data = [];

    for (let array of arrays) {
      if (array.x && array.y && array.y.length) data.push(array);
    }

    if (!data.length) return {
      x: [],
      y: []
    };
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
      y: result
    };
  }

  function checkReagents(well, options = {}) {
    const {
      checkKeys = true,
      checkValues = true,
      keys = ['reference', 'batch', 'uuid', 'concentration']
    } = options;
    const reagents = well.reagents;
    if (reagents.length === 0) throw new Error(`The well ${well.id} has no reagents`);

    for (let reagent of reagents) {
      const entries = Object.entries(reagent);

      if (checkKeys) {
        const inputKeys = entries.map(item => item[0]);

        for (let i = 0; i < keys.length; i++) {
          const boolean = inputKeys.find(item => item === keys[i]);

          if (!boolean) {
            throw new Error(`Property ${keys[i].toUpperCase()} not defined for ${reagent.label} at ${well.id}`);
          }
        }
      }

      if (checkValues) {
        const inputValues = entries.map(item => item[1]);

        for (let i = 0; i < keys.length; i++) {
          const index = inputValues.findIndex(item => item === null || item === undefined || item === '');

          if (index !== -1) {
            throw new Error(`Property ${entries[index][0].toUpperCase()} has undefined value for ${reagent.label} at ${well.id}`);
          }
        }
      }
    }
  }

  /**
   * Returns an array of labels as strings
   * @param {object} [options={}]
   * @param {string} [options.nbRows] - Indicates the number of rows that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
   * @param {string} [options.nbColumns] - Indicates the number of columns that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
   * @param {number} [options.nbPlates] - Indicates the number of plates to be generated.
   * @param {number} [options.initPlate] - It referes the plate where the experiment began.
   * @param {boolean} [options.accountPreviousWells] - For plates where the well label is a number, this option allows to take in count previous labels in the next plate.
   * @param {string} [options.direction] - For plates where the well label is a number, this option sets the direction in which this will increase.
   * @return {Object} {labelsList, axis }
   */
  function generatePlateLabels(options = {}) {
    let {
      nbRows = 'h',
      nbColumns = '12',
      nbPlates = 1,
      initPlate = 0,
      accountPreviousWells = false,
      direction = 'horizontal'
    } = options;
    let entries = Object.entries({
      rows: nbRows,
      columns: nbColumns
    });

    for (let i = 0; i < entries.length; i++) {
      if (Number.isNaN(parseInt(entries[i][1], 10))) {
        let label = entries[i][1].toUpperCase().charCodeAt(0);
        let axis = new Array(label - 64).fill().map((item, index) => String.fromCharCode(index + 65));
        entries[i][1] = axis;
      } else {
        let axis = new Array(parseInt(entries[i][1], 10)).fill().map((item, index) => index + 1);
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
            let [rowIndex, columnIndex] = direction === 'vertical' ? [i, j] : [j, i];
            let factor = accountPreviousWells ? u * rows.length * columns.length : 0;
            row[j] = `${u + 1}-${factor + (columnIndex * rod.length + rod[rowIndex])}`;
          }

          labelsList.push(...row);
        }
      }
    } else {
      for (let u = initPlate; u < initPlate + nbPlates; u++) {
        for (let i = 0; i < rows.length; i++) {
          let row = [];

          for (let j = 0; j < columns.length; j++) {
            let element = typeof rows[i] === 'string' ? rows[i] + columns[j] : columns[j] + rows[i];
            row[j] = `${u + 1}-${element}`;
          }

          labelsList.push(...row);
        }
      }
    }

    return {
      labelsList: labelsList,
      axis: entries
    };
  }

  /**
   * Returns an array of objects containing IDs of the wells with the same reagents and the corresponding key reagents
   * @returns {Array}
   */
  function getSamplesIDs(wells) {
    let sampleWells = [];
    let sampleIDs = [];

    for (let i = 0; i < wells.length; i++) {
      let replicated = JSON.stringify(wells[i].reagents.map(item => item.concentration));
      let feature = sampleWells.find(element => element === replicated);
      if (feature + 1) continue;
      sampleWells.push(replicated);
      const replicates = wells.filter(item => JSON.stringify(item.reagents.map(element => element.concentration)) === replicated).map(item => item.id);
      sampleIDs.push(replicates);
    }

    return sampleIDs;
  }

  function rawAnalysis(wells) {
    const keys = Object.keys(wells[0].analysis.processed);
    let result = {};

    for (let key of keys) {
      let average = 0;

      for (let well of wells) {
        average += well.analysis.processed[key];
      }

      result[key] = average / wells.length;
    }

    return result;
  }

  function setTypeOfPlate(options = {}) {
    const {
      nbRows = 'h',
      nbColumns = '12'
    } = options;
    const rows = Number.isNaN(parseInt(nbRows, 10)) ? nbRows.toUpperCase() : parseInt(nbRows, 10);
    const columns = Number.isNaN(parseInt(nbColumns, 10)) ? nbColumns.toUpperCase() : parseInt(nbColumns, 10);
    return `${rows}x${columns}`;
  }

  /**
   * Returns the array of wells sorted regarding its alphanumeric identifier.
   * @param {Array} - Array of wells
   * @returns {Array}
   */
  function sortWells(array, options = {}) {
    const {
      path = 'id'
    } = options;
    return array.sort((a, b) => {
      return a[path].localeCompare(b[path], 'en', {
        numeric: true
      });
    });
  }

  class Well {
    /**
     * @param {String} id - Identificator
     * @param {String} label - Well label
     * @param {Number} plate - Number of the plate
     * @param {Object} [data={}] - Spectrum and growth curves data
     * @param {Object} [data.growthCurve={}]  - Growth curve obtaineed
     * @param {Array}  [data.growthCurve.x=[]]
     * @param {Array} [data.growthCurve.y=[]]
     * @param {Object} [data.spectrum={}]
     * @param {Array} [data.spectrum.x=[]] - Spectrum obtaineed
     * @param {Array} [data.spectrum.y=[]]
     * @param {Object} [options={}]
     * @param {Object} [options.metadata={}] - Metadata relate to the well
     * @param {Object} [options.analysis={}] - Metadata relate to the well
     * @param {Array} [options.reagents=[]] - Rctants used in the well
     */
    constructor(options = {}) {
      let {
        id = getRandomId(),
        label = undefined,
        plate,
        metadata = {
          color: 'black',
          display: true,
          category: null,
          group: null
        },
        reagents = [],
        analysis = {
          raw: {},
          processed: {}
        },
        growthCurve = {
          data: {
            x: [],
            y: []
          }
        },
        spectrum = {
          data: {
            x: [],
            y: []
          }
        }
      } = options;
      this.id = id;
      this.selected = false;
      this.label = label;
      this.plate = plate;
      this.analysis = analysis;
      this.metadata = metadata;
      this.reagents = reagents;
      this.growthCurve = growthCurve;
      this.spectrum = spectrum;

      if (!growthCurve.data.x && !growthCurve.data.y) {
        this.growthCurve.data.x = [];
        this.growthCurve.data.y = [];
      }

      if (!spectrum.data.x && !spectrum.data.y) {
        this.spectrum.data.x = [];
        this.spectrum.data.y = [];
      }

      this._highlight = id;
    }
    /**
     * Returns the growth curve
     * @returns {Array}
     */


    getGrowthCurve() {
      return this.growthCurve;
    }
    /**
     * Returns the spectrum
     * @returns {Array}
     */


    getSpectrum() {
      return this.spectrum;
    }
    /**
     * Returns the metadata of the well
     * @returns {Object}
     */


    getMetadata() {
      return this.metadata;
    }
    /**
     * Returns the reagents presents in the well
     * @returns {Object}
     */


    getReagents() {
      return this.reagents;
    }
    /**
     * Returns the label of the well
     * @returns {Object}
     */


    getLabel() {
      return this.label;
    }
    /**
     * Returns the id of the well
     * @returns {Object}
     */


    getID() {
      return this.id;
    }
    /**
     * Set the growth curve obtained from the well
     * @param {Object} input
     * @param {Array} [input.x=[]]
     * @param {Array} [input.y=[]]
     */


    addGrowthCurve(growthCurve) {
      if (!Array.isArray(growthCurve.x) || !Array.isArray(growthCurve.y)) {
        throw new Error(`X and Y must be arrays`);
      }

      this.growthCurve = {
        data: growthCurve
      };
    }
    /**
     * Set the spectrum obtained from the well
     * @param {Object} input
     * @param {Array} [input.x=[]]
     * @param {Array} [input.y=[]]
     */


    addSpectrum(spectrum) {
      if (!Array.isArray(spectrum.x) || !Array.isArray(spectrum.y)) {
        throw new Error(`X and Y must be arrays`);
      }

      this.spectrum = {
        data: spectrum
      };
    }
    /**
     * Sets the reagents constituent of the well
     * @param {Object} reagents - Array of reagents as objects
     */


    addReagents(reagents) {
      if (!Array.isArray(reagents)) {
        throw new Error(`Reagents must be a vector of objects`);
      }

      if (this.reagents.length === 0) {
        this.reagents = reagents;
      } else {
        let newReagents = [];

        for (let i = 0; i < reagents.length; i++) {
          let previousReagents = this.reagents[i] ? this.reagents[i] : {};
          newReagents.push(Object.assign({}, previousReagents, reagents[i]));
        }

        this.reagents = newReagents;
      }
    }
    /**
     * Sets the reagents constituent of the well
     * @param {Object} reagents - Array of reagents as objects
     */


    updateReagents(reagents) {
      if (!Array.isArray(reagents)) {
        throw new Error(`Reagents must be a vector of objects`);
      }

      let newReagents = [];

      for (let reagent of reagents) {
        let previousReagent = this.reagents.filter(item => item.label === reagent.label)[0];
        newReagents.push(Object.assign({}, previousReagent, reagent));
      }

      this.reagents = newReagents;
    }
    /**
     * Adds analysis to the well
     * @param {Array} analysis - Object containing the analysis
     */


    addAnalysis(analysis) {
      if (Array.isArray(analysis) || typeof analysis !== 'object') {
        throw new Error(`Result must be a object`);
      }

      let {
        name,
        value
      } = analysis;
      this.analysis.raw[name] = value;
      this.analysis.processed[name] = value;
    }

  }

  /* eslint-disable prefer-named-capture-group */
  class WellPlateData {
    /**
     * Manager of the data regarding a well plates
     * @param {Object} [options={}]
     * @param {String} [options.nbRows] - Indicates the number of rows that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
     * @param {String} [options.nbColumns] - Indicates the number of columns that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
     * @param {Number} [options.nbPlates] - Indicates the number of plates to be generated.
     * @param {Number} [options.initPlate] - It referes the plate where the experiment began.
     * @param {Boolean} [options.accountPreviousWells] - For plates where the well label is a number, this option allows to take in count previous labels in the next plate.
     * @param {String} [options.direction] - For plates where the well label is a number, this option sets the direction in which this will increase.
     */
    constructor(options = {}) {
      this.wells = [];
      this.samples = [];
      this.typeOfPlate = setTypeOfPlate(options);
      let plateLabels = generatePlateLabels(options);
      const labelsList = plateLabels.labelsList;

      for (let i = 0; i < labelsList.length; i++) {
        const label = labelsList[i].split('-');
        this.wells.push(new Well({
          id: labelsList[i],
          plate: label[0],
          label: label[1],
          _highlight: i
        }));
      }
    }
    /**
     * Sets the reagents constituent to each well
     * @param {Array} reagents - Array containing an array of reagents as objects
     */


    addReagentsFromArray(reagents) {
      if (!Array.isArray(reagents) || this.wells.length !== reagents.length) {
        throw new Error(`Input array must have the same length as wells in the plate`);
      }

      for (let i = 0; i < this.wells.length; i++) {
        this.wells[i].addReagents(reagents[i]);
      }

      this.updateSamples();
    }
    /**
     * Sets the corresponding spectrum to each well
     * @param {Array} spectra - Array of objects containing the x and y components of the spectrum
     */


    addSpectrumFromArray(spectra) {
      if (!Array.isArray(spectra)) {
        throw new Error(`Input array must have the same length as wells in the plate`);
      }

      if (!Array.isArray(spectra) || !Array.isArray(spectra[0].array.x) || !Array.isArray(spectra[0].array.y) || spectra[0].array.y.length !== spectra[0].array.x.length) {
        throw new Error(`The input array must be an array`);
      }

      for (let well of this.wells) {
        const spectrum = spectra.filter(item => item.label === well.label)[0];

        if (spectrum !== undefined) {
          well.metadata.display = false;
          well.metadata.color = 'black';
          well.addSpectrum(spectrum.array);
        } else {
          well.metadata.display = false;
          well.metadata.color = 'darkgrey';
        }
      }

      this.updateSamples();
    }
    /**
     * Sets the corresponding growth curve to each well
     * @param {Array} growthCurves - Array of objects containing the x and y components of the growth curve
     */


    addGrowthCurvesFromArray(growthCurves) {
      if (!Array.isArray(growthCurves)) {
        throw new Error(`The input array must be an array`);
      }

      if (!Array.isArray(growthCurves) || !Array.isArray(growthCurves[0].array.x) || !Array.isArray(growthCurves[0].array.y) || growthCurves[0].array.y.length !== growthCurves[0].array.x.length) {
        throw new Error(`The input array must be an array of objects with x and y components`);
      }

      for (let well of this.wells) {
        const growthCurve = growthCurves.filter(item => item.label === well.label)[0];

        if (growthCurve !== undefined) {
          well.metadata.display = false;
          well.metadata.color = 'black';
          well.addGrowthCurve(growthCurve.array);
        } else {
          well.metadata.display = false;
          well.metadata.color = 'darkgrey';
        }
      }

      this.updateSamples();
    }
    /**
     * Sets the corresponding result to each well
     * @param {Array} analysis - Array of objects containing the analysis added
     */


    addAnalysisFromArray(analysis) {
      if (!Array.isArray(analysis)) {
        throw new Error('The analysis input is not an array');
      }

      for (let i = 0; i < this.wells.length; i++) {
        this.wells[i].addAnalysis(analysis[i]);
      }
    }
    /**
     * Returns an array of objects with the corresponding labels to each well
     * @returns {Array}
     */


    getWells(options = {}) {
      const {
        ids
      } = options;
      let wells = [];

      for (let well of this.wells) {
        if (!ids || ids.includes(well.id)) wells.push(well);
      }

      return wells;
    }
    /**
     * Returns an array of objects with the corresponding labels to each well
     * @returns {Array}
     */


    getWell(options = {}) {
      const {
        id
      } = options;

      for (let well of this.wells) {
        if (id === well.id) {
          return well;
        }
      }
    }
    /**
     * Returns a string with CSV format
     * @returns {String}
     */


    getTemplate(options = {}) {
      const {
        separator = ','
      } = options;
      const plate = this.wells;
      const regex = /(?:[0-9]+)|(?:[a-zA-Z]+)/g;
      const reagentsLabels = plate[0].reagents.map(item => item.label);
      const reagentsUnits = plate[0].reagents.map(item => item.unit);
      const reagents = [];

      for (let i = 0; i < reagentsLabels.length; i++) {
        reagents.push(`${reagentsLabels[i]}(${reagentsUnits[i]})`);
      }

      const header = ['row', 'column'].concat(reagents);
      const list = [header];

      for (let well of plate) {
        const splittedLabel = Number.isNaN(parseInt(well.label, 10)) ? well.label.match(regex) : getWellsPositions(well.label);
        const concentrations = well.reagents.map(item => item.concentration);
        list.push(splittedLabel.concat(concentrations));
      }

      return list.map(well => well.join(separator)).join('\n');
    }
    /**
     * Checks out if the reagents contain the needed information
     * @param {Object} [options={}]
     * @param {Boolean} [options.checkKeys] - Parameter that allows to check the keys of the reagents object
     * @param {Boolean} [options.checkValues] - Parameter that allows to check that the values are defined
     * @param {Array} [options.keys] - Array of keys to check
     */


    checkReagents(options = {}) {
      const wells = this.wells;

      for (let well of wells) {
        checkReagents(well, options);
      }
    }
    /**
     * Checks out if the reagents contain the needed information
     * @param {Object} [options={}]
     * @param {Boolean} [options.checkKeys] - Parameter that allows to check the keys of the reagents object
     * @param {Boolean} [options.checkValues] - Parameter that allows to check that the values are defined
     * @param {Array} [options.keys] - Array of keys to check
     */


    getSpectraChart(options = {}) {
      const {
        ids
      } = options;
      const wells = this.wells;
      let chart = {
        data: []
      };

      for (let well of wells) {
        if (!ids || ids.includes(well.id)) {
          if (well.spectrum.data.x.length && well.spectrum.data.y.length) {
            const data = well.spectrum.data;
            addChartStyle(data, well);
            chart.data.push(data);
          }
        }
      }

      return chart;
    }
    /**
     * Checks out if the reagents contain the needed information
     * @param {Object} [options={}]
     * @param {Boolean} [options.checkKeys] - Parameter that allows to check the keys of the reagents object
     * @param {Boolean} [options.checkValues] - Parameter that allows to check that the values are defined
     * @param {Array} [options.keys] - Array of keys to check
     */


    getGrowthCurveChart(options = {}) {
      const {
        ids
      } = options;
      const wells = this.wells;
      let chart = {
        data: []
      };

      for (let well of wells) {
        if (!ids || ids.includes(well.id)) {
          if (well.growthCurve.data.x.length && well.growthCurve.data.y.length) {
            const data = well.growthCurve.data;
            addChartStyle(data, well);
            chart.data.push(data);
          }
        }
      }

      return chart;
    }

    getChartOfSpectraSamples(options) {
      let chart = {
        data: []
      };
      let samples = this.getSamples(options);

      for (let sample of samples) {
        const data = sample.averagedSpectra;
        addChartStyle(data, sample);
        chart.data.push(data);
      }

      return chart;
    }

    getChartOfGrowthCurvesSamples(options) {
      let chart = {
        data: []
      };
      let samples = this.getSamples(options);

      for (let sample of samples) {
        const data = sample.averagedGrowthCurves;
        addChartStyle(data, sample);
        chart.data.push(data);
      }

      return chart;
    }
    /**
     * Returns an array of objects with the corresponding labels to each well
     * @returns {Array}
     */


    getSamples(options = {}) {
      const {
        ids
      } = options;
      let samples = [];

      for (let sample of this.samples) {
        if (!ids || ids.includes(sample.id)) samples.push(sample);
      }

      return samples;
    }
    /**
     * Returns an array of objects with the corresponding labels to each well
     * @returns {Array}
     */


    getSample(options = {}) {
      const {
        id
      } = options;

      for (let sample of this.samples) {
        if (id === sample.id) return sample;
      }
    }
    /**
     * Fills the plate with information coming from external array.
     * @param {Array} plate - Array containing well data as objects.
     */


    static fillPlateFromArray(wells) {
      wells = sortWells(wells);
      const lastLabel = sortWells(wells, {
        path: 'label'
      })[wells.length - 1].label;
      let [nbRows, nbColumns] = Number.isNaN(parseInt(lastLabel, 10)) ? lastLabel.match(/[^\d]+|\d+/g) : [10, 10];
      const nbPlates = parseInt(wells[wells.length - 1].id.split('-')[0], 10);
      const wellPlateData = new WellPlateData({
        nbRows,
        nbColumns,
        nbPlates
      });

      for (let well of wells) {
        const wellIndex = wellPlateData.wells.findIndex(item => item.id === well.id);
        wellPlateData.wells[wellIndex] = new Well(well);
      }

      wellPlateData.typeOfPlate = `${nbRows}x${nbColumns}`;
      wellPlateData.updateSamples();
      return wellPlateData;
    }
    /**
     * Create WellPlateData from CSV and TSV files
     * @param {string} text
     * @param {object} [options={}]
     * @param {object} [options.separator=',']
     */


    static readTemplate(string, options = {}) {
      const {
        separator = ','
      } = options;
      const list = string.split('\n').map(row => row.split(separator)).filter(item => item !== '');
      const wells = [];
      let wellPlateData;

      if (Number.isInteger(parseInt(list[1][0], 10)) && Number.isInteger(parseInt(list[1][1], 10))) {
        wellPlateData = new WellPlateData({
          nbRows: 10,
          nbColumns: 10
        });

        for (let i = 1; i < list.length; i++) {
          const well = {
            id: `1-${(parseInt(list[i][0], 10) - 1) * 10 + parseInt(list[i][1], 10)}`,
            reagents: []
          };

          for (let j = 2; j < list[0].length; j++) {
            well.reagents.push({
              label: list[0][j].split('(')[0],
              unit: /\(([^)]+)\)/.exec(list[0][j])[1],
              concentration: parseFloat(list[i][j])
            });
          }

          wells.push(well);
        }
      } else {
        wellPlateData = new WellPlateData({
          nbRows: 'H',
          nbColumns: 12
        });

        for (let i = 1; i < list.length; i++) {
          const well = {
            id: `1-${list[i][0].concat(list[i][1])}`,
            reagents: []
          };

          for (let j = 2; j < list[0].length; j++) {
            well.reagents.push({
              label: list[0][j].split('(')[0],
              unit: /\(([^)]+)\)/.exec(list[0][j])[1],
              concentration: parseFloat(list[i][j])
            });
          }

          wells.push(well);
        }
      }

      for (let i = 0; i < wells.length; i++) {
        const selectedWell = wellPlateData.getWell({
          id: wells[i].id
        });
        selectedWell.updateReagents(wells[i].reagents);
      }

      wellPlateData.updateSamples();
      return wellPlateData;
    }

  }

  WellPlateData.prototype.resurrect = function () {
    // eslint-disable-next-line import/no-unresolved
    const Datas = require('src/main/datas');

    const DataObject = Datas.DataObject;
    let keys = Object.keys(this.wells[0]);

    for (let well of this.wells) {
      for (let key of keys) {
        well[key] = DataObject.resurrect(well[key]);
      }
    }

    this.updateSamples();
    keys = Object.keys(this.samples[0]);

    for (let sample of this.samples) {
      for (let key of keys) {
        sample[key] = DataObject.resurrect(sample[key]);
      }
    }
  };

  WellPlateData.prototype.updateSamples = function () {
    if (!this.samples.length) {
      const samplesIDs = getSamplesIDs(this.wells);
      let samples = [];

      for (let sampleIDs of samplesIDs) {
        const label = sampleIDs.map(item => item.split('-')[1]).join('-');
        const wells = sampleIDs.map(item => ({
          id: item,
          inAverage: true
        }));
        samples.push(new PlateSample({
          id: getRandomId(),
          label: label,
          wells: wells,
          metadata: {
            color: 'blue',
            display: true,
            category: null,
            group: null
          },
          results: {},
          _highlight: sampleIDs
        }));
      }

      this.samples = samples;
    } else {
      const samples = this.samples;

      for (let sample of samples) {
        const ids = sample.wells.filter(item => item.inAverage).map(item => item.id);
        const wells = this.getWells({
          ids
        });
        const spectra = wells.map(item => item.spectrum.data);
        const growthCurves = wells.map(item => item.growthCurve.data);
        sample.analysis = {
          raw: rawAnalysis(wells),
          averaged: averageAnalysis(wells),
          wells: wells.map(well => ({
            id: well.id,
            analysis: well.analysis
          }))
        };
        sample.averagedSpectra = averageArrays(spectra);
        sample.averagedGrowthCurves = averageArrays(growthCurves);
        sample.reagents = wells[0].reagents;
        this.test(sample);
      }
    }
  };

  WellPlateData.prototype.test = function (sample) {
    const sampleWells = sample.wells;
    const ids = sampleWells.filter(item => item.inAverage).map(item => item.id);
    const wells = this.getWells({
      ids
    });
    const keys = Object.keys(wells[0].analysis.processed);
    if (!wells.length || !keys.length) return;
    sampleWells.map(item => item.test = []);

    for (const key of keys) {
      const values = wells.map(item => item.analysis.processed[key]);
      const {
        test,
        criticalValue
      } = grubbs(values);
      sample.grubbsCriticalValue = criticalValue;

      for (let i = 0; i < sampleWells.length; i++) {
        if (ids.includes(sampleWells[i].id)) {
          const index = ids.indexOf(sampleWells[i].id);
          sampleWells[i].test.push({
            label: key,
            color: test[index].pass ? '#46FF8F' : '#FF4649',
            ...test[index]
          });
        } else {
          const well = this.getWell({
            id: sampleWells[i].id
          });
          sampleWells[i].test.push({
            label: key,
            color: '#EAEAEA',
            value: well.analysis.processed[key],
            score: 0,
            pass: undefined
          });
        }
      }
    }
  };

  function getWellsPositions(label, options = {}) {
    const {
      columns = 10
    } = options;
    const nbRow = Math.floor((label - 1) / columns);
    const nbColumn = label - columns * nbRow;
    return [nbRow + 1, nbColumn];
  }

  exports.WellPlateData = WellPlateData;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=well-plate-data.js.map
