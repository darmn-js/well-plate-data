/**
 * well-plate-data - Well plate data manager
 * @version v0.0.1
 * @link https://github.com/josoriom/well-plate-data#readme
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.wellPlateData = {}));
}(this, (function (exports) { 'use strict';

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
     * @param {Array} [options.reagents=[]] - Rctants used in the well
     */
    constructor(options = {}) {
      let {
        id = getRandomId(),
        label = undefined,
        plate,
        metadata = {},
        reagents = [],
        results = [],
        _highlight = getRandomId()
      } = options;
      this.id = id;
      this.selected = false;
      this.label = label;
      this.plate = plate;
      this.results = results;
      this.metadata = metadata;
      this.reagents = reagents;
      this.growthCurve = {};
      this.spectrum = {};
      this.growthCurve.x = [];
      this.growthCurve.y = [];
      this.spectrum.x = [];
      this.spectrum.y = [];
      this._highlight = _highlight;
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

      this.growthCurve = growthCurve;
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

      this.spectrum = spectrum;
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
     * Adds results to the well
     * @param {Array} result - Object containing the results
     */


    addResults(result) {
      if (Array.isArray(result) || typeof result !== 'object') {
        throw new Error(`Result must be a object`);
      }

      if (!result.name || !result.value) {
        throw new Error('The name or the value of the result is not defined');
      }

      this.results.push(result);
    }

  }

  class WellPlateData {
    /**
     * Manager of the data regarding a well plates
     * @param {object} [options={}]
     * @param {string} [options.nbRows] - Indicates the number of rows that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
     * @param {string} [options.nbColumns] - Indicates the number of columns that the well plate will contain (if the input is a letter the number of rows will increase alphabetically until it reaches the letter defined as input).
     * @param {number} [options.nbPlates] - Indicates the number of plates to be generated.
     * @param {number} [options.initPlate] - It referes the plate where the experiment began.
     * @param {boolean} [options.accountPreviousWells] - For plates where the well label is a number, this option allows to take in count previous labels in the next plate.
     * @param {string} [options.direction] - For plates where the well label is a number, this option sets the direction in which this will increase.
     */
    constructor(options = {}) {
      this.wells = [];
      let plateLabels = generatePlateLabels(options);
      const labelsList = plateLabels.labelsList;
      this.plateLabels = labelsList;

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
       * Fills the plate with information coming from external array.
       * @param {Array} plate - Array containing well data as objects.
       */


    fillPlateFromArray(plate) {
      let wells = [];

      for (let well of plate) {
        wells.push(new Well(well));
      }

      this.wells = wells;
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
    }
    /**
     * Sets the corresponding spectrum to each well
     * @param {Array} spectra - Array of objects containing the x and y components of the spectrum
     */


    addSpectrumFromArray(spectra) {
      if (!Array.isArray(spectra) || this.wells.length !== spectra.length) {
        throw new Error(`Input array must have the same length as wells in the plate`);
      }

      if (!Array.isArray(spectra) || !Array.isArray(spectra[0].x) || !Array.isArray(spectra[0].y)) {
        throw new Error(`The input array must be an array of objects with x and y components`);
      }

      for (let i = 0; i < this.wells.length; i++) {
        this.wells[i].addSpectrum(spectra[i]);
      }
    }
    /**
     * Sets the corresponding growth curve to each well
     * @param {Array} growthCurves - Array of objects containing the x and y components of the growth curve
     */


    addGrowthCurvesFromArray(growthCurves) {
      if (!Array.isArray(growthCurves) || this.wells.length !== growthCurves.length) {
        throw new Error(`The input array must have the same length as wells in the plate`);
      }

      if (!Array.isArray(growthCurves) || !Array.isArray(growthCurves[0].x) || !Array.isArray(growthCurves[0].y) || growthCurves[0].y.length !== growthCurves[0].x.length) {
        throw new Error(`The input array must be an array of objects with x and y components`);
      }

      for (let i = 0; i < this.wells.length; i++) {
        this.wells[i].addGrowthCurve(growthCurves[i]);
      }
    }
    /**
     * Sets the corresponding result to each well
     * @param {Array} results - Array of objects containing the results added
     */


    addResultsFromArray(results) {
      if (!Array.isArray(results)) {
        throw new Error('The results input is not an array');
      }

      for (let i = 0; i < this.wells.length; i++) {
        this.wells[i].addResults(results[i]);
      }
    }
    /**
     * Returns an array of objects with the corresponding labels to each well
     * @returns {Array}
     */


    getPlateTemplate() {
      return this.plateLabels.map((item, index) => ({
        index: index,
        label: item,
        selected: false,
        _highlight: index
      }));
    }
    /**
     * Returns an array of objects containing IDs of the wells with the same reagents and the corresponding key reagents
     * @returns {Array}
     */


    getSamplesIDs() {
      const wells = this.wells;
      let sampleWells = [];
      let sampleLabels = [];

      for (let i = 0; i < wells.length; i++) {
        let replicated = JSON.stringify(wells[i].reagents.map(item => item.concentration));
        let feature = sampleWells.find(element => element === replicated);
        if (feature + 1) continue;
        sampleWells.push(replicated);
        const replicatesLabels = wells.filter(item => JSON.stringify(item.reagents.map(element => element.concentration)) === replicated).map(item => item.label);
        sampleLabels.push(replicatesLabels);
      }

      return sampleLabels;
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

  }

  exports.WellPlateData = WellPlateData;
  exports.generatePlateLabels = generatePlateLabels;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=well-plate-data.js.map
