var mongoose = require('mongoose')

var newsSchema = {
  titre: String,
  desc: String,
  date: { type: Date, default: Date.now }
}

var News = mongoose.model('news', newsSchema)

exports.getAll = function (req, res) {
  News.find().limit(5).sort({ date: -1 }).exec(function (err, data) {
    if (err) throw err
    res.send(200, data)
  })
}

exports.create = function (req, res) {
  News.create(req.body, function (err) {
    if (err) throw err
    res.send(201)
  })
}

exports.delete = function (req, res) {
  News.find({ _id: req.params.id}).remove().exec(function (err) {
    if (err) return res.send(404)
    res.send(200)
  })
}
