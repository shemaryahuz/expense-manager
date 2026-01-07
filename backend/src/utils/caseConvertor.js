export function toCamelCase(str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function keysToCamel(object) {
    if (Array.isArray(object)) {
        return object.map(value => keysToCamel(value));
    } else if (object !== null && object !== undefined && object.constructor === Object) {
        return Object.keys(object).reduce((result, key) => {
            result[toCamelCase(key)] = keysToCamel(object[key]);
            return result;
        }, {});
    }
    return object;
}