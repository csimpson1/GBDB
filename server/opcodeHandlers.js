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

module.exports = {getAllOpcodes};