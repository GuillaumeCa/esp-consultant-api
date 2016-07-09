var mongoose = require('mongoose')

var consultantSchema = {
  nom: String
}

var Consultant = mongoose.model('Consultant', consultantSchema)

exports.create = function (req, res) {
  Consultant.create({ nom: req.body.nom }, function (err) {
    if (err) {
      res.send(404)
    } else {
      res.send(201)
    }
  })
}

exports.getAll = function (req, res) {
  Consultant.find().exec(function (err, cons) {
    res.send(200, cons)
  })
}
