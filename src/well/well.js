import { getRandomId } from '../utilities/getRandomId';

export class Well {
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
   * @param {Object} [options.results={}] - Metadata relate to the well
   * @param {Array} [options.reagents=[]] - Rctants used in the well
   */
  constructor(options = {}) {
    let {
      id = getRandomId(),
      label = undefined,
      plate,
      metadata = {},
      reagents = [],
      results = {},
      growthCurve = {
        data: { x: [], y: [] }
      },
      spectrum = {
        data: { x: [], y: [] }
      }
    } = options;

    this.id = id;
    this.selected = false;
    this.label = label;
    this.plate = plate;
    this.results = results;
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
      let previousReagent = this.reagents.filter((item) => item.label === reagent.label)[0];
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
    let { name, value } = result;
    this.results[name] = value;
  }
}
