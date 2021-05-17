import { addChartStyle } from './addChartStyle'
import { checkReagents } from './checkReagents';
import { generatePlateLabels } from './generatePlateLabels';
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
      throw new Error(
        `Input array must have the same length as wells in the plate`,
      );
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
      throw new Error(
        `The input array must be an array`,
      );
    }
    for (let well of this.wells) {
      const spectrum = spectra.filter((item) => item.label === well.label)[0];
      if (spectrum !== undefined ) {
        well.metadata.display = true;
        well.metadata.color = 'red';
        well.addSpectrum(spectrum.array);
      } else {
        well.metadata.display = false;
        well.metadata.color = 'darkgrey';
      }
    }
  }

  /**
   * Sets the corresponding growth curve to each well
   * @param {Array} growthCurves - Array of objects containing the x and y components of the growth curve
   */
  addGrowthCurvesFromArray(growthCurves) {
    if (
      !Array.isArray(growthCurves)
    ) {
      throw new Error(
        `The input array must be an array`,
      );
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
      const growthCurve = growthCurves.filter((item) => item.label === well.label)[0];
      if (growthCurve !== undefined ) {
        well.metadata.display = true;
        well.metadata.color = 'red';
        well.addGrowthCurve(growthCurve.array);
      } else {
        well.metadata.display = false;
        well.metadata.color = 'darkgrey';
      }
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
   * Returns an array of objects containing IDs of the wells with the same reagents and the corresponding key reagents
   * @returns {Array}
   */
  getSamplesIDs() {
    const wells = this.wells;
    let sampleWells = [];
    let sampleLabels = [];
    for (let i = 0; i < wells.length; i++) {
      let replicated = JSON.stringify(
        wells[i].reagents.map((item) => item.concentration),
      );
      let feature = sampleWells.find((element) => element === replicated);
      if (feature + 1) continue;
      sampleWells.push(replicated);
      const replicatesLabels = wells
        .filter(
          (item) =>
            JSON.stringify(
              item.reagents.map((element) => element.concentration),
            ) === replicated,
        )
        .map((item) => item.label);
      sampleLabels.push(replicatesLabels);
    }
    return sampleLabels;
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

  readTemplate(string, options = {}) {
    const { separator = ',' } = options;
    const list = string.split('\n').map((row) => row.split(separator));
    const type = list[0][0] === 'row' ? true : false;
    let wells = [];
    if (type) {
      for (let i = 1; i < list.length; i++) {
        let well = {
          id: `1-${list[i][0].concat(list[i][1])}`,
          reagents: [],
        };
        for (let j = 2; j < list[0].length; j++) {
          well.reagents.push({
            label: list[0][j],
            concentration: parseFloat(list[i][j])
          });
        }
        wells.push(well);
      }
    } else {
      for (let i = 1; i < list.length; i++) {
        let well = {
          id: `1-${list[i][0]}`,
          reagents: [],
        };
        for (let j = 1; j < list[0].length; j++) {
          well.reagents.push({
            label: list[0][j],
            concentration: parseFloat(list[i][j])
          });
        }
        wells.push(well);
      }
    }

    for (let i = 0; i < wells.length; i++) {
      const selectedWell = this.getWell({ id: wells[i].id });
      selectedWell.updateReagents(wells[i].reagents);
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
}
