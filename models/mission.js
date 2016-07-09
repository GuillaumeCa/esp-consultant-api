var mongoose = require('mongoose')

var missionSchema = {
  nom: String,
  description: String,
  date_debut: { type: Date, default: Date.now },
  date_fin: Date,
  cdp: String,
  jeh: Number,
  competence: [String],
  niveau: { type: Number, default: 0 },
  priorite: { type: Number, default: 0 },
  avancement: {
    niveau: { type: Number, default: 0 },
    date: { type: Date, default: Date.now}
  },
  consultant_id: [Number]
}

var Mission = mongoose.model('Mission', missionSchema)

exports.getAll = function (req, res) {
  Mission.find().exec(function (err, missions) {
    if (err) throw err
    res.send(missions)
  })
}

exports.getOne = function (req, res) {
  Mission.findOne({ _id: req.params.id }, function (err, missions) {
    if (err) throw err
    res.send(missions)
  })
}

exports.create = function (req, res) {
  Mission.create(req.body, function (err) {
    if (err) {
      res.send(404)
    } else {
      res.send(201)
    }
  })
}

exports.update = function (req, res) {
  
}

exports.delete = function (req, res) {

}
