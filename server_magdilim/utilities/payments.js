const statusCache = require('./status-cache');
const dbUtil = require('./db');

const getOrgsToPay = (db, callback) => {
    const orgsToPay = {};
    let gotOneTimeFlag = false;
    let gotOwedFlag = false;   

    getDonations(db, (err, result) => {
        if (!err) {console.log('\ndonations:\n'+JSON.stringify(result))
            gotOneTimeFlag = true;
            result.forEach(donation => {
                const org_id = donation.org_id;
                if (!orgsToPay[org_id]) {
                    orgsToPay[org_id] = {};
                }

                if (!orgsToPay[org_id].sum) {
                    orgsToPay[org_id].sum = 0;
                }

                orgsToPay[org_id].sum += donation.sum_donation;
            });

            if (gotOwedFlag) {
                removePaidOrgs(db, orgsToPay, (err, result) => {
                    if (!err) {
                        sumAmountToPay(orgsToPay);
                        return callback(null, orgsToPay);
                    } else {
                        return callback(err, null);
                    }
                });
            }
        } else {
            console.log('error getting one time donations: ' + JSON.stringify(err));
            return callback(err, null);
        }
    });

    getPreviouslyOwed(db, (err, result) => {
        gotOwedFlag = true;

        if (!err) {
            result.forEach(row => {
                const org_id = row.org_id;

                if (!orgsToPay[org_id]) {
                    orgsToPay[org_id] = {};
                }

                orgsToPay[org_id].owed = row.still_owed;
            });

            if (gotOneTimeFlag) {
                removePaidOrgs(db, orgsToPay, (err, result) => {
                    if (!err) {
                        sumAmountToPay(orgsToPay);
                        return callback(null, orgsToPay);
                    } else {
                        return callback(err, null);
                    }
                });
            }
        } else {
            return callback(err, null);
        }
    });
};

const sumAmountToPay = (orgsToPay) => {
    Object.keys(orgsToPay).forEach(org_id => {
        const org = orgsToPay[org_id];
        console.log('org:' + JSON.stringify(org));
        orgsToPay[org_id].sum = (org.sum || 0) +  (org.owed || 0);
    });
}

const getDonations = (db, callback) => {
    const [beginningOfCurrent, beginningOfPrev] = beginningOfCurrAndPrevMonth();
    const condition = ` WHERE d_date < "${beginningOfCurrent}"`;
    const sqlOneTimeQuery = `SELECT * FROM One_time_donations ${condition} AND d_date >= "${beginningOfPrev}"`;
    const sqlDioQuery = `SELECT d_i_o_id as donation_id, user_id, org_id, d_date, anonymous, monthly_donation as sum_donations, referred_by FROM Donors_in_org ${condition} AND status_id=1`;
    dbUtil.callDB(db, `${sqlOneTimeQuery} UNION ${sqlDioQuery}`, callback);
}

const getPreviouslyOwed = (db, callback) => {
    const [beginningOfCurrent, beginningOfPrev] = beginningOfCurrAndPrevMonth();
    const sqlQuery = `SELECT * FROM Payments WHERE date_paid < "${beginningOfCurrent}" AND date_paid >= "${beginningOfPrev}"`
    dbUtil.callDB(db, sqlQuery, callback);
}

const removePaidOrgs = (db, orgsToPay, callback) => {
    getPaidOrgs(db, (err, result) => {
        if (!err) {
            result.forEach(row => {
                delete orgsToPay[row.org_id];
            });
            callback(null, orgsToPay);
        } else {
            callback(err, null);
        }
    });
}

const getPaidOrgs = (db, callback) => {
    const [beginningOfCurrent, beginningOfNext] = beginningOfCurAndNextMonth();
    const sqlQuery = `SELECT * FROM Payments WHERE date_paid >= "${beginningOfCurrent}" AND date_paid < "${beginningOfNext}"`
    dbUtil.callDB(db, sqlQuery, callback);
}

const beginningOfCurrAndPrevMonth = () => {
    const now = new Date();
    const beginningOfCurrent = new Date(now.getFullYear(), now.getMonth(), 1);
    let beginningOfPrev;
    if (now.getMonth() === 1) {
        beginningOfPrev = new Date(now.getFullYear() - 1, 12, 1);
    } else {
        beginningOfPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }

    return [beginningOfCurrent.toJSON().slice(0, 19).replace('T', ' '), beginningOfPrev.toJSON().slice(0, 19).replace('T', ' ')];
}

const beginningOfCurAndNextMonth = () => {
    const now = new Date();
    const beginningOfCurrent = new Date(now.getFullYear(), now.getMonth(), 1);
    let beginningOfNext;
    if (now.getMonth() === 12) {
        beginningOfNext = new Date(now.getFullYear() + 1, 1, 1);
    } else {
        beginningOfNext = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    return [beginningOfCurrent.toISOString(), beginningOfNext.toISOString()];
}

const payOrgs = (db, orgs, callback) => {
    const now = new Date().toJSON().slice(0, 19).replace('T', ' ');
    const orgsInserts = orgs.reduce((acc, org, index) => {
        console.log(acc);
        const orgInsert = `(${org.org_id}, ${org.amount_paid}, '${now}', ${org.still_owed})`;
        if (index === orgs.length - 1) {
            return `${acc} ${orgInsert};`
        }
        return `${acc} ${orgInsert},`
    }, '');
    console.log('orgsinserts:' + orgsInserts);
    console.log('orgs:' + JSON.stringify(orgs));
    const sqlQuery = `INSERT INTO Payments (org_id, amount_paid, date_paid, still_owed) VALUES ${orgsInserts}`;

    dbUtil.callDB(db, sqlQuery, callback);
}

exports.getOrgsToPay = getOrgsToPay;
exports.payOrgs = payOrgs;
exports.beginningOfCurrAndPrevMonth = beginningOfCurrAndPrevMonth;
