const personLevelModel = require('../models/personLevelSchema');

const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const db = require('../database')
const url = require('../database')


/* Runs mongoose function to get all records from the database */
async function getAllRecordsFromDB() {
    uploadCSVtoDB();
    var records = await personLevelModel.find(function (err, docs) {
        if (err) {
            throw err;
        } else {
            if (docs) {
                console.log('Found all records.');
            } else {
                console.log('No records found.')
            }
        }
    }).clone();

    return records;
}

/* Runs mongoose function to find a specific record */
async function getRecordFromDB(id) {
    var record = await personLevelModel.findOne({ uid: id }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            if (doc) {
                console.log('Found ' + doc);
            } else {
                console.log('Could not find record with uid: ' + id);
            }
        }
    }).clone();

    return record;
}

/* Runs mongoose function to add an entire record to the database */
async function addRecordToDB(body) {
    var record = new personLevelModel(body);
    var status = await personLevelModel.findOne(body, function (err, doc) {
        if (err) {
            throw err;
        } else {
            if (doc) {
                console.log('Record already exists.');
            } else {
                record.save(function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Added ' + doc);
                    }
                });
            }
        }
    }).clone();

    return status;
}

/* Runs mongoose function that finds a record by an ID and updates it with whatever input */
async function updateRecordInDB(id, body) {
    var status = await personLevelModel.findOneAndUpdate({ uid: id }, body, function (err, doc) {
        if (err) {
            throw err;
        } else {
            if (doc) {
                console.log('Sucessfully updated the record to: ' + doc);
            } else {
                console.log('No record found to update.');
            }
        }
    }).clone();

    return status;
}

/* Runs mongoose function to find a record by an ID and delete it */
async function deleteRecordFromDB(id) {
    var status = await personLevelModel.findOne({ uid: id });

    await personLevelModel.findOneAndDelete({ uid: id }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            if (doc) {
                console.log('Sucessfully deleted record :' + doc);
            } else {
                console.log('No record found to delete.');
            }
        }
    }).clone();

    return status;
}

/* Runs mongoose function to delete all records in the database */
async function deleteAllRecordsFromDB() {
    var records = await personLevelModel.deleteMany({}, function (err, docs) {
        if (err) {
            throw err;
        } else {
            if (docs) {
                console.log('Deleted all records.');
            } else {
                console.log('No records found.')
            }
        }
    }).clone();

    return records;
}

/* Utilizes Add Record to DB Method to upload CSV File */
async function uploadCSVtoDB(csvFileName) {
    csvtojson()
    .fromFile("mockDataPersonColumns.csv")
    .then(csvData => {
        for(i=0; i<csvData.length; i++) {
            addRecordToDB(csvData[i])
        }
    })
}

module.exports = {
    getAllRecordsFromDB,
    getRecordFromDB,
    addRecordToDB,
    updateRecordInDB,
    deleteRecordFromDB,
    deleteAllRecordsFromDB,
    uploadCSVtoDB
};