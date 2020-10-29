const PouchDB = require('pouchdb-browser');
const pouchDB = PouchDB.default.defaults();
var db;

exports.pouchCREATEDB = (name) => {
    var database = new pouchDB('http://127.0.0.1:5984/' + name);
    db = database
}

exports.pouchSET = (doc) => {
    db.put(doc)
}

exports.pouchGET = (id, callback) => {
    db.get(id).then(function (doc) {
       callback(doc);
    });     
}



