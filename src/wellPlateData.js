import { generatePlateLabels } from './generatePlateLabels';
import { Well } from './well/well';

export class WellPlateData {
  /**
   * Manager of the data regarding a well plates
   * @param {object} [options={}]
   */
  constructor(options = {}) {
    this.wells = [];
    let plateLabels = generatePlateLabels(options);
    const labelsList = plateLabels.labelsList;
    this.plateLabels = labelsList;
    for (let i = 0; i < labelsList.length; i++) {
      const label = labelsList[i].split('-');
      this.wells.push(new Well(label[1], { plate: label[0] }));
    }
  }

  /**
   * Sets the reagents constituent to each well
   * @param {Array} input
   */
  addReagentsFromArray(input) {
    if (!Array.isArray(input) || this.wells.length !== input.length) {
      throw new Error(
        `Input array must have the same length as wells in the plate`,
      );
    }
    for (let i = 0; i < this.wells.length; i++) {
      this.wells[i].addReagents(input[i]);
    }
  }

  /**
   * Sets the reagents constituent to each well
   * @param {Array} input
   */
  addSpectrumFromArray(input) {
    if (!Array.isArray(input) || this.wells.length !== input.length) {
      throw new Error(
        `Input array must have the same length as wells in the plate`,
      );
    }
    if (
      !Array.isArray(input) ||
      !Array.isArray(input[0].x) ||
      !Array.isArray(input[0].y)
    ) {
      throw new Error(
        `The input array must be an array of objects with x and y components`,
      );
    }
    for (let i = 0; i < this.wells.length; i++) {
      this.wells[i].addSpectrum(input[i]);
    }
  }

  /**
   * Sets the reagents constituent to each well
   * @param {Array} input
   */
  addGrowthCurvesFromArray(input) {
    if (!Array.isArray(input) || this.wells.length !== input.length) {
      throw new Error(
        `The input array must have the same length as wells in the plate`,
      );
    }

    if (
      !Array.isArray(input) ||
      !Array.isArray(input[0].x) ||
      !Array.isArray(input[0].y) ||
      input[0].y.length !== input[0].x.length
    ) {
      throw new Error(
        `The input array must be an array of objects with x and y components`,
      );
    }
    for (let i = 0; i < this.wells.length; i++) {
      this.wells[i].addGrowthCurve(input[i]);
    }
  }

  /**
   * Sets the reagents constituent to each well
   * @param {Array} input
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
   * Sets the reagents constituent to each well
   * @param {Array} input
   */
  getPlateLabels() {
    return this.plateLabels.map((item) => ({ label: item }));
  }

  /**
   * Sets the reagents constituent to each well
   * @param {Array} input
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
}
