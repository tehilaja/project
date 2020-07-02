const inQutationMarks = (str) => {
    return str && `'${str}'` || null;
}

exports.inQutationMarks = inQutationMarks;
