import { getRandomId } from './utilities/getRandomId';

export class PlateSample {
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
      },
      averagedSpectra = { x: [], y: [] },
      averagedGrowthCurves = { x: [], y: [] },
      _highlight = getRandomId()
    } = options;
    this.id = id;
    this.label = label;
    this.wells = wells;
    this.metadata = metadata;
    this.averagedSpectra = averagedSpectra;
    this.averagedGrowthCurves = averagedGrowthCurves;
    this._highlight = _highlight;
  }
}

