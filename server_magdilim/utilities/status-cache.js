let organizationsTrees = {}; // organizationsTrees[org_id] returns the full org tree
let usersToOrganizationTrees = {}; // usersToOrganizationTrees[user_id][org_id] returns the org tree for that user
let orgToLevels = undefined; // 

const getDonersFromDbAndSetCache = (db, callback) => {
    const sqlQuery = `SELECT * FROM Doners_in_org`; console.log(sqlQuery);
    try{
        db.query(sqlQuery, (err, result, fields) => {
            if (err) throw err;
            console.log("doners in org:\n" + JSON.stringify(result));
            getLevels(db, () => {
                setCache(result);
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
            orgToLevels = groupBy(result, 'org_id');
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

const setCache = (donersInOrg) => {
    if (Array.isArray(donersInOrg)) {
        const orgToDoners = groupBy(donersInOrg, 'org_id'); // dict where key is the org_id and value is an array of doners

        // for each org create tree
        Object.keys(orgToDoners).forEach(orgId => {
            // declare root which will be the root of the org tree
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
            orgTree.key.is_root = true; // we do not want to mistakebly give a gift to the root, which represents the entire org and not a specific doner
            //console.log(`\n\n\norg ${orgId} tree:\n` + JSON.stringify(getOrgTree(orgId)))
        });
    }
}

const buildTree = (orgId, rootDoners, treeRoot, donersByReferrer) => {
    rootDoners.forEach(doner => {

        const node = {
            id: doner.user_id,
            name: doner.user_id,
            parent: { id: treeRoot.id || `org_${orgId}` },
            key: {
                donated: doner.monthly_donation,
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

    const level = getDonerLevel(root.key, levels);
    root.key.level = level && level.level_num || 0;
    return root.key;
}

const getDonerLevel = (doner, levels) => {
    // a lambda deciding if the doner is at a given level or not
    const isDonerAtLevel = (level) => {
        return !!((!level.min_people || level.min_people <= doner.referred_doners) && (!level.min_sum || level.min_sum <= doner.collected)); // !! in order to turn an object into a boolean value
    }

    return levels.find(isDonerAtLevel); // returns the first level meeting the lambda. (Levels are sorted from higher to lower.)
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
const getGiftsReceivers = (db, callback) => {
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
                        console.log('raffle of: ' + JSON.stringify(donersAtLevel));
                        console.log('gift receiver: ' + donersAtLevel[random]);
                    }
                });
            });
        });

        if (callback) callback(giftsReceivers);
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
            acc.push(root.id);
        }
        if (root.children && root.children.length) {
            root.children.forEach(child => getDonersFromTreeAtLevel(child, level, acc)); // recursion
        }
    }
}

const addDonerToOrg = (doner_id, org_id, monthly_donation, referrer) => {
    const nodeParent = referrer && getOrgTreeForUser(referrer, org_id) || getOrgTree(org_id);
    const node = {
        id: doner_id,
        name: doner_id,
        parent: { id: nodeParent.id },
        key: {
            donated: monthly_donation,
            collected: monthly_donation,
            referred_doners: 1,
        },
        children: [],
    };

    const level = getDonerLevel(node.key, orgToLevels[org_id]);
    node.key.level = level && level.level_num || 0;
    nodeParent.children.push(node);
    updateAnccestors(node, org_id, monthly_donation, 1);
}

const updateDonerInOrg = (doner_id, org_id, old_monthly_donation, new_monthly_donation) => {
    const node = getOrgTreeForUser(doner_id, org_id);
    const newCollected = new_monthly_donation - old_monthly_donation;
    node.key.collected += newCollected;
    node.key.donated = new_monthly_donation;
    const level = getDonerLevel(node.key, orgToLevels[org_id]);
    node.key.level = level && level.level_num || 0;
    updateAnccestors(node, org_id, newCollected, 0);
}

const updateAnccestors = (node, org_id, newCollected, newReferred) => {
    let pointer = node;

    while (pointer.parent) {
        console.log(`\n\nparent: ${pointer.parent.id}\n\n`);
        pointer = `org_${org_id}` === pointer.parent.id && getOrgTree(org_id) || getOrgTreeForUser(pointer.parent.id, org_id);
        pointer.key.collected += newCollected;
        pointer.key.referred_doners += newReferred;
        const level = getDonerLevel(pointer.key, orgToLevels[org_id]);
        pointer.key.level = level && level.level_num || 0;
    }
}

const updateLevelInOrg = (org_id, level) => {
    const prevLevel = orgToLevels[org_id].find(x => level.level_num === x.level_num);
    Object.assign(prevLevel, level);
    updateLevelByOrgDoners(getOrgTree(org_id), org_id, orgToLevels[org_id]);
}

const updateLevelByOrgDoners = (root, org_id, levels) => {
    const level = getDonerLevel(root.key, orgToLevels[org_id]);
    root.key.level = level && level.level_num || 0;

    if (root.children && root.children.length) {
        root.children.forEach(child => updateLevelByOrgDoners(child, org_id, levels));
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

// maps the levels and returns the first level that equales the level num we got. if level doesn't exsist the level will be none
const getOrgLevel = (org_id, level_num) => orgToLevels[org_id].find(x => level_num === x.level_num) || {level_name: 'none', level_num: level_num};



exports.getDonersInOrg = getDonersOfOrgAtLevel;
exports.setCache = getDonersFromDbAndSetCache;
exports.getOrgTree = getOrgTree;
exports.getOrgTreeForUser = getOrgTreeForUser;
exports.getGiftsReceivers = getGiftsReceivers;
exports.getOrgsForUser = getOrgsForUser;
exports.getOrgLevel = getOrgLevel;

exports.addDonerToOrg = addDonerToOrg;
exports.updateDonerInOrg = updateDonerInOrg;
exports.updateLevelInOrg = updateLevelInOrg;
