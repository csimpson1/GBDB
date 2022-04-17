const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI, OPCODES_COL } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
    getDBConnection,
    sendResp
} = require("./utils");

// GET all opcodes from the database

const getAllOpcodes = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const db = await getDBConnection(client);
        const opcodes = await db.collection(OPCODES_COL).find().toArray();
        sendResp(res, 200, opcodes);
    }

    catch(err) {
        console.log(err);
        sendResp(res, 500, {}, err);
    }

    finally{
        client.close();
    }
};

const expandArrayDisjunction = (key, paramVal) => {
    // given a key an an array of possible values, return an object representing the
    // query string

    // sample query
    // db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )

    let query = []
    if(Array.isArray(paramVal) && paramVal.length > 1){
        const disjunct = paramVal.map(elt => {
            const queryPart = {};
            queryPart[key] = elt;
            return queryPart;
        });
        query = disjunct;
    }
    
    // No need to add the or clause if we have a singleton array
    else if(Array.isArray(paramVal) && paramVal.length === 1){
        console.log(key, ' ', paramVal);
        let queryPart = {};
        queryPart[key] = paramVal[0];
        query.push(queryPart);
    }

    else {
        console.log(key, ' ', paramVal);
        let queryPart = {};
        queryPart[key] = paramVal;
        query.push(queryPart);
    }

    return query;

    
}

const getOpcodesByParams = async(req, res) => {
    // get all opcodes from the database that match a specific conjunction of parameters
    // TODO: Investigate feasibility of passing a formula in conjunctive normal form
    const client = new MongoClient(MONGO_URI, options);
    try{
        // simple parmeters in our DB consist of a literal value. These are
        // mnemonic, bytes, immediate, hexCode

        // complex parameters in our DB consist of some kind of data structure. these are
        // cycles, operands, flags

        let queryString = {};
        Object.keys(req.body).forEach(key => {
            // for simple parameters, we just look to see if we are passing multiple values to search for, and
            // provide the correct query object
            if(['mnemonic', 'bytes', 'immediate', 'hexCode'].includes(key)){
                queryString = {...queryString, $or: expandArrayDisjunction(key, req.body[key])}
            }
        })

        console.log(queryString);
        const db = await getDBConnection(client);
        const opcodes = await db.collection(OPCODES_COL).find(queryString).toArray();
        sendResp(res, 200, opcodes);
    }

    catch(err){
        console.log(err);
        sendResp(res, 500, {}, err);
    }

    finally{
        client.close();
    }
}

module.exports = {getAllOpcodes, getOpcodesByParams};