
// Dependencies
var http = require('http')

function geocode(query, callback) {
  var options = {
    hostname: 'maps.googleapis.com',
    path: '/maps/api/geocode/json?address=' +
      encodeURIComponent(query) + '&sensor=false'
  }

  http.request(options, function(res) {
    var data = ''
    res.on('data', function(chunk) {
      data += chunk
    })
    res.on('end', function() {
      data = JSON.parse(data)
      if (data.results.length){
        callback(null, data.results[0].geometry.location)
      } else {
        callback("No results found.", null)
      }
    })
  }).end()
}

module.exports = geocode
