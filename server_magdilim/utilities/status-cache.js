let organizationsTrees = {}; // organizationsTrees[org_id] returns the full org tree
let usersToOrganizationTrees = {}; // usersToOrganizationTrees[user_id][org_id] returns the org tree for that user
let orgToLevels = undefined; // 

const getDonersFromDbAndSetCache = (db, callback) => {
    const sqlQuery = `SELECT * FROM doners_in_org`; console.log(sqlQuery);

    db.query(sqlQuery, (err, result, fields) => {
        if (err) throw err;
        console.log("doners in org:\n" + JSON.stringify(result));
        getLevels(db, () => {
            setCache(result);
            if (callback) callback();
        });
    });
}

const getLevels = (db, callback) => {
    const sqlQuery = `SELECT * FROM levels`;

    db.query(sqlQuery, (err, result, fields) => {
        if (err) throw err;
        console.log("levels:\n" + JSON.stringify(result));
        orgToLevels = groupBy(result, 'org_id');
        Object.keys(orgToLevels).forEach(org_id => {
            orgToLevels[org_id].sort((x, y) => y.level_num - x.level_num);
            console.log(`levels of org ${org_id}:\n`+JSON.stringify(orgToLevels[org_id]));
        });
        if (callback) {
            callback();
        }
    });
}

const setCache = (donersInOrg) => {
    if (Array.isArray(donersInOrg)) {
        const orgToDoners = groupBy(donersInOrg, 'org_id'); // dict where key is the org_id and value is an array of doners

        // for each org create tree
        Object.keys(orgToDoners).forEach(orgId => {
            // declare root whick will be the root of the org tree
            const orgTree = {
                key: {
                    collected: 0,
                    referred_doners: 0,
                },
                children: [],
            };
            organizationsTrees[orgId] = orgTree; // add reference to this tree in the organizations dict
            const doners = orgToDoners[orgId]; // an array of doners to this org
            const donersByReferrer = groupBy(doners, 'referred_by'); // a dict where the key is a doner, and the value is an array of all the people he referred to this org
            const rootDoners = donersByReferrer[null];
            buildTree(orgId, rootDoners, orgTree, donersByReferrer);
            scanTreeAndUpdateNodes(orgTree, orgToLevels[orgId]);
            orgTree.key.is_root = true; // we do not want to mistakenly give a gift to the root, which represents the entire org and not a specific doner
            console.log(`\n\n\norg ${orgId} tree:\n` + JSON.stringify(getOrgTree(orgId)))
        });
    }
}

const buildTree = (orgId, rootDoners, treeRoot, donersByReferrer) => {
    rootDoners.forEach(doner => {

        const node = {
            key: {
                donerId: doner.user_id,
                collected: doner.monthly_donation,
                referred_doners: 1,
            },
            children: [],
        };

        treeRoot.children.push(node);

        usersToOrganizationTrees[doner.user_id] = usersToOrganizationTrees[doner.user_id] || {}; // init user's dict of org_id to tree if not initialized
        usersToOrganizationTrees[doner.user_id][orgId] = node; // add org tree to user's dict

        const refferedDoners = donersByReferrer[doner.user_id];
        if (refferedDoners && refferedDoners.length) {
            buildTree(orgId, refferedDoners, node, donersByReferrer); // recursion
        }
    });
}

const scanTreeAndUpdateNodes = (root, levels) => {
    const reduceFunc = (acc, child) => {
        const resultFromChild = scanTreeAndUpdateNodes(child, levels);

        return {
            collected: acc.collected + resultFromChild.collected,
            referred_doners: acc.referred_doners + resultFromChild.referred_doners,
        };
    }

    if (root.children && root.children.length) {
        const resultFromChildren = root.children.reduce(reduceFunc, { collected: 0, referred_doners: 0 });
        root.key.collected += resultFromChildren.collected;
        root.key.referred_doners += resultFromChildren.referred_doners;        
    }

    const level = getDonerLevelInOrg(root.key, levels);
    root.key.level = (level && level.level_num) || 0;
    return root.key;
}

const getDonerLevelInOrg = (doner, levels) => {
    const isDonerAtLevel = (level) => {
        return !!((!level.min_people || level.min_people <= doner.referred_doners) && (!level.min_sum || level.min_sum <= doner.collected));
    }

    return levels.find(isDonerAtLevel);
}

//get today's gifts from db, grouped by orgs
const getGifts = (db, callback) => {
    const currentDate = new Date();
    const sqlQuery = `SELECT * FROM gifts`;
    
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


//Returns a dict where keys are gift ids, and values are array of doners who would get the gift
const getGiftsReceivers = (db) => {
    getGifts(db, (gifts) => {
        const giftsReceivers = {};

        Object.keys(gifts).forEach(org_id => {
            const giftsByLevel = groupBy(gifts[org_id], 'level_num'); // if there are  a few gifts in the same org at the same level, list of doners will be the same... therefore were grouping gifts by level

            Object.keys(giftsByLevel).forEach(level => {
                console.log(`org: ${org_id} level: ${level}`);
                const donersAtLevel = getDonersOfOrgAtLevel(org_id, level);

                giftsByLevel[level].forEach(gift => {
                    if (!gift.raffle || !donersAtLevel.length) {
                        giftsReceivers[gift.gift_id] = donersAtLevel; // if there are no doners at this level, donersAtLevel would be []
                    } else {                        
                        const random = Math.floor(Math.random() * donersAtLevel.length);
                        giftsReceivers[gift.gift_id] = [donersAtLevel[random]];
                        console.log('raffle of: '+JSON.stringify(donersAtLevel));
                        console.log('gift receiver: '+donersAtLevel[random]);
                    }
                });
            });
        });
        console.log('gift receivers: '+JSON.stringify(giftsReceivers));
        return giftsReceivers;
    });
}

const getDonersOfOrgAtLevel = (org_id, level) => {
    const orgTree = getOrgTree(org_id);
    const doners = [];
    getDonersFromTreeAtLevel(orgTree, level, doners);
    return doners;
}

// recursive function which accepts an org tree root, a level, and an array which will serve as an accumulator collecting the list of doners which will be the result
const getDonersFromTreeAtLevel = (root, level, acc) => {
    if (root.key.level >= level) {
        if (!root.key.is_root) {
            acc.push(root.key.donerId);
        }
        if (root.children && root.children.length) {
            root.children.forEach(child => getDonersFromTreeAtLevel(child, level, acc)); // recursion
        }
    }
}


// example:
//input: array = [{name: 'tehila', course: 'math', grade: 100}, {name: 'avital', course: 'hebrew', grade: 100}, {name: 'tehila', course: 'english', grade: 100}] key = 'name'
//result: { tehila: [{name: 'tehila', course: 'math', grade: 100}, {name: 'tehila', course: 'english', grade: 100}], avital: [{name: 'avital', course: 'hebrew', grade: 100}]}
const groupBy = (array, key) => array.reduce((acc, x) => Object.assign({}, acc, {
    [x[key]]: (acc[x[key]] || []).concat(x)
}), {});

const getOrgTree = (orgId) => organizationsTrees[orgId];

const getOrgTreeForUser = (userId, orgId) => usersToOrganizationTrees[userId][orgId];

 // returns a dict mapping org id to the user's node of that org tree
const getOrgsForUser = (userId) => usersToOrganizationTrees[userId];


exports.getDonersInOrg = getDonersOfOrgAtLevel;
exports.setCache = getDonersFromDbAndSetCache;
exports.getOrgTree = getOrgTree;
exports.getOrgTreeForUser = getOrgTreeForUser;
exports.getGiftsReceivers = getGiftsReceivers;
exports.getOrgsForUser = getOrgsForUser;