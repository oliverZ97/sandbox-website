const PouchDB = require('pouchdb-browser');
const pouchDB = PouchDB.default.defaults();

exports.pouchInit = () => {
    var db = new pouchDB('example');
    db.info().then(function (info) {
        console.log(info);
    })
}

exports.pouchSET = (doc) => {
    db.put(doc)
}

exports.pouchGET = (id) => {
    db.get(id).then(function (doc) {
        console.log(doc);
    });     
}


