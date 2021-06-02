export function averageAnalysis(wells){
    const keys = Object.keys(wells[0].analysis)
    let result = [];
    for (let key of keys) {
        let average = 0;
        for (let well of wells) {
            average += well.analysis[key];
        }
        result.push({
            [key]: average / wells.length
        })
    }
    return result;
}