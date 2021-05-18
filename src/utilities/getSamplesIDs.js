/**
 * Returns an array of objects containing IDs of the wells with the same reagents and the corresponding key reagents
 * @returns {Array}
 */
export function getSamplesIDs(wells) {
    let sampleWells = [];
    let sampleIDs = [];
    for (let i = 0; i < wells.length; i++) {
        let replicated = JSON.stringify(
        wells[i].reagents.map((item) => item.concentration),
        );
        let feature = sampleWells.find((element) => element === replicated);
        if (feature + 1) continue;
        sampleWells.push(replicated);
        const replicates = wells
        .filter(
            (item) =>
            JSON.stringify(
                item.reagents.map((element) => element.concentration),
            ) === replicated,
        )
        .map((item) => item.id);
        sampleIDs.push(replicates);
    }
    return sampleIDs;
}
