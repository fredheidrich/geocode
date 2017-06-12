

// var mongoose = require('mongoose')

// var jobSchema = mongoose.Schema({
//     id: String,
//     status: String,
//     addressList: [
//         { 
//             name: String,
//             address: String,
//             location: {
//                 lat: Number,
//                 lng: Number
//             }
//         }
//     ]
// })

// jobSchema.methods.geocode = function() {
//     console.log('geocode');
// }


// phony
// function geocode(query, callback) {
//     console.log(query);
//     callback(null, { lat: -35.4997992, lng: 138.78107 })
// }


var geocode = require('../modules/geocode')



var Job = function(id, status, data) {
    this.id = id
    this.status = status
    this.data = data
}

Job.prototype.query = function() {

    if (this.status === 'pending') {
        return this.id
    }
    return this.data
}

Job.prototype.toString = function() {
    return {
        id: this.id,
        status: this.status,
        data: this.data
    }
}

Job.prototype.geocode = function(callback) {

    for (var i = this.data.length - 1; i >= 0; i--) {
        if (this.data[i].location != null || !this.data[i].location.length) {
            var self = this
            geocode(this.data[i].address, function(err, data) {
                if (!err) {
                    console.log(data);
                    self.data[i].location = data
                    callback(data)
                } else {
                    return err
                }
            })
        }
    }
    this.status = 'done'
}



module.exports = Job
