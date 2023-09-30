//const  MongoClient  = require('mongodb').MongoClient;// you can assume this or like line 4
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://surajbarman989:vBBWDYz3Ns1PyrgO@cluster0.evhrbqo.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
let db;

async function connectToDatabase() {
  try {
    const mongoClient = await new MongoClient(uri).connect();

    console.log("{har har Mahadev} Successfully connected to MongoDB Atlas!");

    db = mongoClient.db("issueTracker");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    throw error;
  }
}

function getDbConnection() {
  if (!db) {
    throw new Error(
      "MongoDB connection not established. Call connectToDatabase() first."
    );
  }
  return db;
}

module.exports = { connectToDatabase, getDbConnection };

//
// surajbarman989
