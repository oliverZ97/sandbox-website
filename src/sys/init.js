var db = require("./database");

exports.init = () => {
    console.log("machines starting...")
    db.pouchInit();
}