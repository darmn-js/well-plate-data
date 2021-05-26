/**
 * Returns the array of wells sorted regarding its alphanumeric identifier.
 * @param {Array} - Array of wells
 * @returns {Array}
 */
export function sortWells(array, options={}) {
    const { path = 'id' } = options;
    return array.sort(function(a, b) {
        return a[path].localeCompare(b[path], 'en', { numeric: true });
    })
}