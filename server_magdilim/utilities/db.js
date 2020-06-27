const callDB = (db, sqlQuery, callback) => {
    db.query(sqlQuery, (err, result, fields) => {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, result);
        }
    });
}

exports.callDB = callDB;