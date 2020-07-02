function escape(str) {
    return str.split('"').join('\\"').split("'").join("\\'").split('`').join('\\`');
}

export function escapeAllStringsInObject(obj) {

    if (Array.isArray(obj)) {
        return obj.map(x => escapeAllStringsInObject(x));
    }

    if (!obj) {
        return obj;
    }

    const result = {};

    Object.keys(obj).forEach(property => {
        switch (typeof obj[property]) {
            case 'number':
            case 'boolean':
                result[property] = obj[property];
                break;
            case 'string':
                result[property] = escape(obj[property]);
                break;
            case 'object':
            default:
                result[property] = escapeAllStringsInObject(obj[property]);
        }        
    });

    return result;
}

