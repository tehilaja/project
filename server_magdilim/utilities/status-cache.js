const dbUtil = require('./db');

let organizationsTrees = {}; // organizationsTrees[org_id] returns the full org tree
let usersToOrganizationTrees = {}; // usersToOrganizationTrees[user_id][org_id] returns the org tree for that user
let orgToLevels = undefined; // 

const addOrgsWithNoDonors = (db, callback) => {console.log('in add orgs with no donors')
    const sqlQuery = `SELECT org_id FROM organizations WHERE org_id NOT IN (SELECT org_id FROM donors_in_org WHERE status_id = 1);`;
    dbUtil.callDB(db, sqlQuery, (err, result) => {
        if (!err) {
            result.forEach(org => addOrg(org.org_id))
            console.log('\n\n\n\norgs:\n'+Object.keys(organizationsTrees));
            if (callback) callback();
        } else {
            console.log("error adding orgs with no donors:" + JSON.stringify(err))
        }
    })
}

const getOrgsToPayTrees = () => {
    const result = {};

    Object.keys(organizationsTrees)
        .filter(org_id => getOrgTree(org_id) && getOrgTree(org_id).key && getOrgTree(org_id).key && getOrgTree(org_id).key.collected)
        .forEach(org_id => result[org_id] = organizationsTrees[org_id]);

    return result;
}

const getDonorsFromDbAndSetCache = (db, callback) => {
    const sqlQuery = `SELECT * FROM donors_in_org WHERE status_id=1`;
    try{
        db.query(sqlQuery, (err, result, fields) => {
            if (err) throw err;
            console.log("donors in org:\n" + JSON.stringify(result));
            getLevels(db, () => {
                setCache(result);
                addOrgsWithNoDonors(db);
                if (callback) callback();
            });
        });
    }catch(err){
        throw err;
    }
}

const getLevels = (db, callback) => {
    const sqlQuery = `SELECT * FROM levels`;
    try{
        db.query(sqlQuery, (err, result, fields) => {
            if (err) throw err;
            console.log("levels:\n" + JSON.stringify(result));
            orgToLevels = groupBy(result, 'org_id'); //dict containing key: org_id, value: levels
            Object.keys(orgToLevels).forEach(org_id => {
                orgToLevels[org_id].sort((x, y) => y.level_num - x.level_num);
                console.log(`levels of org ${org_id}:\n` + JSON.stringify(orgToLevels[org_id]));
            });
            if (callback) {
                callback();
            }
        });
    }catch(err){
        throw err;
    }
}

const setCache = (donorsInOrg) => {
    if (Array.isArray(donorsInOrg)) {
        const orgToDonors = groupBy(donorsInOrg, 'org_id'); // dict where key is the org_id and value is an array of donors

        // for each org create tree
        Object.keys(orgToDonors).forEach(orgId => {
            // declare root which will be the root of the org tree
            const orgTree = {
                key: {
                    collected: 0,
                    referred_donors: 0,
                },
                children: [],
            };
            organizationsTrees[orgId] = orgTree; // add reference to this tree in the organizations dict
            const donors = orgToDonors[orgId]; // an array of donors to this org
            const donorsByReferrer = groupBy(donors, 'referred_by'); // a dict where the key is a donor, and the value is an array of all the people he referred to this org
            const rootDonors = donorsByReferrer[null];
            buildTree(orgId, rootDonors, orgTree, donorsByReferrer);
            scanTreeAndUpdateNodes(orgTree, orgToLevels[orgId]);
            orgTree.key.is_root = true; // we do not want to mistakebly give a gift to the root, which represents the entire org and not a specific donor
            //console.log(`\n\n\norg ${orgId} tree:\n` + JSON.stringify(getOrgTree(orgId)))
        });
    }
}

const buildTree = (orgId, rootDonors, treeRoot, donorsByReferrer) => {
    rootDonors.forEach(donor => {

        const node = {
            id: donor.user_id,
            name: donor.user_id,
            parent: { id: treeRoot.id || `org_${orgId}` },
            key: {
                donated: donor.monthly_donation,
                collected: donor.monthly_donation,
                referred_donors: 1,
            },
            children: [],
        };

        treeRoot.children.push(node);

        usersToOrganizationTrees[donor.user_id] = usersToOrganizationTrees[donor.user_id] || {}; // init user's dict of org_id to tree if not initialized
        usersToOrganizationTrees[donor.user_id][orgId] = node; // add org tree to user's dict

        const refferedDonors = donorsByReferrer[donor.user_id];
        if (refferedDonors && refferedDonors.length) {
            buildTree(orgId, refferedDonors, node, donorsByReferrer); // recursion
        }
    });
}

const scanTreeAndUpdateNodes = (root, levels) => {
    const reduceFunc = (acc, child) => {
        const resultFromChild = scanTreeAndUpdateNodes(child, levels);

        return {
            collected: acc.collected + resultFromChild.collected,
            referred_donors: acc.referred_donors + resultFromChild.referred_donors,
        };
    }

    if (root.children && root.children.length) {
        const resultFromChildren = root.children.reduce(reduceFunc, { collected: 0, referred_donors: 0 });
        root.key.collected += resultFromChildren.collected;
        root.key.referred_donors += resultFromChildren.referred_donors;
    }

    const level = getDonorLevel(root.key, levels);
    root.key.level = level && level.level_num || 0;
    return root.key;
}

const getDonorLevel = (donor, levels) => {
    // a lambda deciding if the donor is at a given level or not
    const isDonorAtLevel = (level) => {
        return !!((!level.min_people || level.min_people <= donor.referred_donors) && (!level.min_sum || level.min_sum <= donor.collected)); // !! in order to turn an object into a boolean value
    }

    return levels && levels.find(isDonorAtLevel) || null; // returns the first level meeting the lambda. (Levels are sorted from higher to lower.)
}

//get today's gifts from db, grouped by orgs
const getGifts = (db, callback) => {
    const currentDate = new Date().toISOString().substr(0, 10);
    const sqlQuery = `SELECT * FROM gifts WHERE g_date LIKE '${currentDate}'`;

    //const sqlQuery = `SELECT * FROM gifts WHERE g_date = ${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
    console.log(sqlQuery);
    // db.query does not return the result. The result can only be accessed within a callback. Therefore, we accept a callback as a parameter, in order to pass down the results.
    // (if we set a global variable to the result - we will cause a race condition.)
    db.query(sqlQuery, (err, result, fields) => {
        if (err) throw err;
        console.log("gifts:\n" + JSON.stringify(result));
        const gifts = groupBy(result, 'org_id');
        if (callback) callback(gifts);
    });
}

const addOrg = (org_id, levels) => {
     // declare root which will be the root of the org tree
     const orgTree = {
        key: {
            collected: 0,
            referred_donors: 0,
        },
        children: [],
    };
    organizationsTrees[org_id] = orgTree;
    if (levels) {
        updateLevelsInOrg(org_id, levels);
    }
}


//Returns a dict where keys are gift ids, and values are array of donors who would get the gift
const getGiftsReceivers = (db, callback) => {
    getGifts(db, (gifts) => {
        const giftsReceivers = {};

        Object.keys(gifts).forEach(org_id => {
            const giftsByLevel = groupBy(gifts[org_id], 'level_num'); // if there are  a few gifts in the same org at the same level, list of donors will be the same... therefore were grouping gifts by level

            Object.keys(giftsByLevel).forEach(level => {
                console.log(`org: ${org_id} level: ${level}`);
                const donorsAtLevel = getDonorsOfOrgAtLevel(org_id, level);

                giftsByLevel[level].forEach(gift => {
                    if (!gift.raffle || !donorsAtLevel.length) {
                        giftsReceivers[gift.gift_id] = donorsAtLevel; // if there are no donors at this level, donorsAtLevel would be []
                    } else {
                        const random = Math.floor(Math.random() * donorsAtLevel.length);
                        giftsReceivers[gift.gift_id] = [donorsAtLevel[random]];
                        console.log('raffle of: ' + JSON.stringify(donorsAtLevel));
                        console.log('gift receiver: ' + donorsAtLevel[random]);
                    }
                });
            });
        });

        if (callback) callback(giftsReceivers);
    });
}

const getDonorsOfOrgAtLevel = (org_id, level) => {
    const orgTree = getOrgTree(org_id);
    const donors = [];
    getDonorsFromTreeAtLevel(orgTree, level, donors);
    return donors;
}

// recursive function which accepts an org tree root, a level, and an array which will serve as an accumulator collecting the list of donors which will be the result
const getDonorsFromTreeAtLevel = (root, level, acc) => {
    if (root.key.level >= level) {
        if (!root.key.is_root) {
            acc.push(root.id);
        }
        if (root.children && root.children.length) {
            root.children.forEach(child => getDonorsFromTreeAtLevel(child, level, acc)); // recursion
        }
    }
}

const addDonorToOrg = (donor_id, org_id, monthly_donation, referrer) => {
    const nodeParent = referrer && getOrgTreeForUser(referrer, org_id) || getOrgTree(org_id);
    const node = {
        id: donor_id,
        name: donor_id,
        parent: { id: nodeParent.id },
        key: {
            donated: monthly_donation,
            collected: monthly_donation,
            referred_donors: 1,
        },
        children: [],
    };

    const level = getDonorLevel(node.key, orgToLevels[org_id]);
    node.key.level = level && level.level_num || 0;
    nodeParent.children.push(node);
    updateAnccestors(node, org_id, monthly_donation, 1);
}

const updateDonorInOrg = (donor_id, org_id, old_monthly_donation, new_monthly_donation) => {
    const node = getOrgTreeForUser(donor_id, org_id);
    const newCollected = new_monthly_donation - old_monthly_donation;
    node.key.collected += newCollected;
    node.key.donated = new_monthly_donation;
    const level = getDonorLevel(node.key, orgToLevels[org_id]);
    node.key.level = level && level.level_num || 0;
    updateAnccestors(node, org_id, newCollected, 0);
}

const updateAnccestors = (node, org_id, newCollected, newReferred) => {
    let pointer = node;

    while (pointer.parent && pointer.parent.id) {
        console.log(`\n\nparent: ${pointer.parent.id}\n\n`);
        pointer = `org_${org_id}` === pointer.parent.id && getOrgTree(org_id) || getOrgTreeForUser(pointer.parent.id, org_id);
        pointer.key.collected += newCollected;
        pointer.key.referred_donors += newReferred;
        const level = getDonorLevel(pointer.key, orgToLevels[org_id]);
        pointer.key.level = level && level.level_num || 0;
    }
}

const updateLevelInOrg = (org_id, level) => {
    updateLevelsInOrg(org_id, [level]);
}

const updateLevelByOrgDonors = (root, org_id, levels) => {
    const level = getDonorLevel(root.key, orgToLevels[org_id]);
    root.key.level = level && level.level_num || 0;

    if (root.children && root.children.length) {
        root.children.forEach(child => updateLevelByOrgDonors(child, org_id, levels));
    }
}

const updateLevelsInOrg = (org_id, levels) => {
    levels.forEach(level => {
        const prevLevels = orgToLevels[org_id];

        if (prevLevels) {
            const prevLevel = prevLevels.find(x => level.level_num === x.level_num);
            Object.assign(prevLevel, level);
        } else {
            orgToLevels[org_id] = levels;
        }
                
    });
console.log('org id before updating levels:'+org_id)
    updateLevelByOrgDonors(getOrgTree(org_id), org_id, getOrgLevels(org_id));
}




// example:
//input: array = [{name: 'tehila', course: 'math', grade: 100}, {name: 'avital', course: 'hebrew', grade: 100}, {name: 'tehila', course: 'english', grade: 100}] key = 'name'
//result: { tehila: [{name: 'tehila', course: 'math', grade: 100}, {name: 'tehila', course: 'english', grade: 100}], avital: [{name: 'avital', course: 'hebrew', grade: 100}]}
const groupBy = (array, key) => array.reduce((acc, x) => Object.assign({}, acc, {
    [x[key]]: (acc[x[key]] || []).concat(x)
}), {});

const getOrgTree = (orgId) => organizationsTrees[orgId];

//returns the downline for the user in the given organization:
const getOrgTreeForUser = (userId, orgId) => usersToOrganizationTrees[userId][orgId];

// returns a dict mapping org id to the user's node of that org tree
const getOrgsForUser = (userId) => usersToOrganizationTrees[userId];

// returns array of levels of org_id
const getOrgLevels = (org_id) => orgToLevels[org_id];

// maps the levels and returns the first level that equals the level num we got. if level doesn't exsist the level will be none
const getOrgLevel = (org_id, level_num) => getOrgLevels(org_id).find(x => level_num === x.level_num) || {level_name: 'none', level_num: level_num};

exports.getDonorsInOrg = getDonorsOfOrgAtLevel;
exports.setCache = getDonorsFromDbAndSetCache;
exports.getOrgTree = getOrgTree;
exports.getOrgTreeForUser = getOrgTreeForUser;
exports.getGiftsReceivers = getGiftsReceivers;
exports.getOrgsForUser = getOrgsForUser;
exports.getOrgLevel = getOrgLevel;
exports.getOrgLevels = getOrgLevels;

exports.getOrgsToPayTrees = getOrgsToPayTrees;
exports.addOrg = addOrg;
exports.addDonorToOrg = addDonorToOrg;
exports.updateDonorInOrg = updateDonorInOrg;
exports.updateLevelInOrg = updateLevelInOrg;
exports.updateLevelsInOrg = updateLevelsInOrg;
// exports.updateLevelByOrgDoners = updateLevelByOrgDoners;
