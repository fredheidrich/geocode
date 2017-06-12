

// Dependencies
var express = require('express'),
    bodyParser = require('body-parser')

// Globals
var FILE = 'data.json'


// Express
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Phony database
var json = require('./modules/json')
var Job = require('./models/job')
var jobs = json.readJSONSync(FILE)


// Site
app.use(express.static('site'))

// Routes
app.get('/jobs/:id?', function(req, res) {
  var id = Number(req.params.id)
  console.log(jobs);
  var reply
  if (!id) {
    res.json(jobs)
  } else {
    data = jobs.filter(function(d) {
      return (d.id === id)
    })

    if (data.length) {
      reply = {
        status: "Found",
        data: data
      }
    } else {
      reply = {
        status: "Not found",
        id: id
      }
    }
    res.send(reply)
  }
})

app.get('/geocode', function(req, res) {

  var results = []
  var completed = function() {
    res.send({ status: "done", results: results })
  }

  if (jobs.length === 0) {
    completed()
  }

  var tasks = jobs.length
  for (var i = jobs.length - 1; i >= 0; i--) {
    var job = new Job(jobs[i].id, jobs[i].status, jobs[i].data)
    job.geocode(function(result) {
      results.push(result)
      tasks--
      if (tasks === 0) {
        console.log('obj');
        completed()
      }
    })
  }
})

app.post('/json', function(req, res) {

  console.log(jobs);
  var id = jobs[jobs.length - 1].id + 1
  var data = req.body

  var job = new Job(id, 'pending', data)

  // phony database
  jobs.push(job.toString())
  json.writeJSON(FILE, jobs)

  job.geocode()
  job.query()

  // res.json(job.toString())
  res.json({ id: id })
})



// Start server
app.listen(3000, function() {
  console.log('Ready')
})
