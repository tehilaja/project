const inQutationMarks = (str) => {
    return str && `'${str}'` || null;
}

const sqlDateString = (date) => {
    return (date || new Date()).toJSON().slice(0, 19).replace('T', ' ');
}

exports.inQutationMarks = inQutationMarks;
exports.sqlDateString = sqlDateString;
