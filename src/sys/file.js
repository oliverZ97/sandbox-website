var fs = require('fs');

exports.readFile = (path) => {
    console.log(path)
    let file = fs.readFileSync(path);
    console.log(file)
    return file
}