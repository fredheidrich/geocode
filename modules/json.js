
// Dependencies
var fs = require('fs')

function readJSON(file, callback) {
  fs.readFile(file, function(err, data) {
    if (err) {
      return callback(err)
    } else {
      callback(null, data)
    }
  })
}

function readJSONSync(file) {
  return JSON.parse(fs.readFileSync(file))
}

function writeJSON(file, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(file, JSON.stringify(data, null, 2), function(err) {
      if (err) {
        return reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

exports.readJSON = readJSON
exports.readJSONSync = readJSONSync
exports.writeJSON = writeJSON
