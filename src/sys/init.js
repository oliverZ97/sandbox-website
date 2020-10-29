var db = require("./database");

exports.init = () => {
    console.log("database machines starting...")
    db.pouchCREATEDB("m5_db_1")
      
}