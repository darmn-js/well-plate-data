import { PlateSample } from './plateSample';
import { addChartStyle } from './utilities/addChartStyle';
import { averageArrays } from './utilities/averageArrays';
import { checkReagents } from './utilities/checkReagents';
import { generatePlateLabels } from './utilities/generatePlateLabels';
import { getRandomId } from './utilities/getRandomId';
import { getSamplesIDs } from './utilities/getSamplesIDs';
import { setTypeOfPlate } from './utilities/setTypeOfPlate';
import { sortWells } from './utilities/sortWells';
import { Well } from './well/well';

export class WellPlateData {
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
      this.wells.push(
        new Well({
          id: labelsList[i],
          plate: label[0],
          label: label[1],
          _highlight: i,
        }),
      );
    }
  }

  /**
   * Sets the reagents constituent to each well
   * @param {Array} reagents - Array containing an array of reagents as objects
   */
  addReagentsFromArray(reagents) {
    if (!Array.isArray(reagents) || this.wells.length !== reagents.length) {
      throw new Error(
        `Input array must have the same length as wells in the plate`,
      );
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
      throw new Error(
        `Input array must have the same length as wells in the plate`,
      );
    }
    if (
      !Array.isArray(spectra) ||
      !Array.isArray(spectra[0].array.x) ||
      !Array.isArray(spectra[0].array.y) ||
      spectra[0].array.y.length !== spectra[0].array.x.length
    ) {
      throw new Error(`The input array must be an array`);
    }
    for (let well of this.wells) {
      const spectrum = spectra.filter((item) => item.label === well.label)[0];
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

    if (
      !Array.isArray(growthCurves) ||
      !Array.isArray(growthCurves[0].array.x) ||
      !Array.isArray(growthCurves[0].array.y) ||
      growthCurves[0].array.y.length !== growthCurves[0].array.x.length
    ) {
      throw new Error(
        `The input array must be an array of objects with x and y components`,
      );
    }
    for (let well of this.wells) {
      const growthCurve = growthCurves.filter(
        (item) => item.label === well.label,
      )[0];
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
  getWells(options = {}) {
    const { ids } = options;
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
    const { id } = options;
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
    const { separator = ',' } = options;
    const plate = this.wells;
    const regex = /(?:[0-9]+)|(?:[a-zA-Z]+)/g;
    let label = plate[0].label;
    let reagents = plate[0].reagents.map((item) => item.label);
    let splittedLabel = label.match(regex);
    let header = splittedLabel.length === 2 ? ['row', 'column'] : ['well'];
    header = header.concat(reagents);
    const list = [header];
    for (let well of plate) {
      splittedLabel = well.label.match(regex);
      reagents = well.reagents.map((item) => item.concentration);
      list.push(splittedLabel.concat(reagents));
    }
    return list.map((well) => well.join(separator)).join('\n');
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
    const { ids } = options;
    const wells = this.wells;
    let chart = {
      data: [],
    };

    for (let well of wells) {
      if (!ids || ids.includes(well.id)) {
        if (well.spectrum.x.length && well.spectrum.y.length) {
          const data = well.spectrum;
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
    const { ids } = options;
    const wells = this.wells;
    let chart = {
      data: [],
    };

    for (let well of wells) {
      if (!ids || ids.includes(well.id)) {
        if (well.growthCurve.x.length && well.growthCurve.y.length) {
          const data = well.growthCurve;
          addChartStyle(data, well);
          chart.data.push(data);
        }
      }
    }
    return chart;
  }

  getChartOfSpectraSamples(options) {
    let chart = {
      data: [],
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
      data: [],
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
    const { ids } = options;
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
    const { id } = options;

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
    const lastLabel = sortWells(wells, { path: 'label' })[wells.length - 1].label;
    let [nbRows, nbColumns] = Number.isNaN(parseInt(lastLabel, 10)) ?
      lastLabel.match(/[^\d]+|\d+/g): [10, 10];
    const nbPlates = parseInt(wells[wells.length - 1].id.split('-')[0], 10);
    const wellPlateData = new WellPlateData({ nbRows, nbColumns, nbPlates });
    for (let well of wells) {
      const wellIndex = wellPlateData.wells.findIndex((item) => item.id === well.id);
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
    const { separator = ',' } = options;
    const list = string.split('\n').map((row) => row.split(separator));
    const type = list[0][0] === 'row' ? true : false;
    let wells = [];
    let wellPlateData;
    if (type) {
      wellPlateData = new WellPlateData({ nbRows: 'H', nbColumns: 12 });
      for (let i = 1; i < list.length; i++) {
        let well = {
          id: `1-${list[i][0].concat(list[i][1])}`,
          reagents: [],
        };
        for (let j = 2; j < list[0].length; j++) {
          well.reagents.push({
            label: list[0][j],
            concentration: parseFloat(list[i][j]),
          });
        }
        wells.push(well);
      }
    } else {
      wellPlateData = new WellPlateData({ nbRows: 10, nbColumns: 10 });
      for (let i = 1; i < list.length; i++) {
        let well = {
          id: `1-${list[i][0]}`,
          reagents: [],
        };
        for (let j = 1; j < list[0].length; j++) {
          well.reagents.push({
            label: list[0][j],
            concentration: parseFloat(list[i][j]),
          });
        }
        wells.push(well);
      }
    }

    for (let i = 0; i < wells.length; i++) {
      const selectedWell = wellPlateData.getWell({ id: wells[i].id });
      selectedWell.updateReagents(wells[i].reagents);
    }
    wellPlateData.updateSamples();
    return wellPlateData;
  }
}

WellPlateData.prototype.updateSamples = function () {
  if (!this.samples.length) {
    const samplesIDs = getSamplesIDs(this.wells);
    let samples = [];
    for (let sampleIDs of samplesIDs) {
      const label = sampleIDs.map((item) => item.split('-')[1]).join('-');
      const wells = sampleIDs.map((item) => ({ id: item, inAverage: true }));
      samples.push(
        new PlateSample({
          id: getRandomId(),
          label: label,
          wells: wells,
          metadata: {
            color: 'blue',
            display: true,
          },
        }),
      );
    }
    this.samples = samples;
  } else {
    const samples = this.samples;
    for (let sample of samples) {
      const ids = sample.wells.map((item) => item.id);
      const wells = this.getWells({ ids });
      const spectra = wells.map((item) => item.spectrum);
      const growthCurves = wells.map((item) => item.growthCurve);
      sample.averagedSpectra = averageArrays(spectra);
      sample.averagedGrowthCurves = averageArrays(growthCurves);
    }
  }
};
