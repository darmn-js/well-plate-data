import { checkReagents } from './checkReagents';
import { getRandomId } from './getRandomId';

export class Well {
  /**
   * @param {String} id - Identificator
   * @param {String} label - Well label
   * @param {Number} plate - Number of the plate
   * @param {Object} [data={}]
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
  constructor(label, options = {}) {
    let {
      id = getRandomId(),
      plate,
      metadata = {},
      reagents = [],
      results = [],
    } = options;
    this.id = id;
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
   * @param {Object} input
   * @param {Array} [input.x=[]]
   * @param {Array} [input.y=[]]
   */
  addReagents(reagents) {
    if (!Array.isArray(reagents)) {
      throw new Error(`Reagents must be a vector of objects`);
    }
    checkReagents(reagents);
    this.reagents = reagents;
  }

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
