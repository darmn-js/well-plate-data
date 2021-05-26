/**
 * Returns the array of wells sorted regarding its alphanumeric identifier.
 * @param {Array} - Array of wells
 * @returns {Array}
 */
export function sortWells(array) {
    array.sort(function(a, b) {
        return a.id.localeCompare(b.id, 'en', { numeric: true });
    })
}