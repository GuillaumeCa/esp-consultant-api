var mongoose = require('mongoose');
var crypto = require('crypto');

var usersSchema = {
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  active: { type: Boolean, default: false }
}

var Users = mongoose.model('users', usersSchema)

var secret = "83e5e7191faea38f7f7b25385e289600"

function hash(data) {
  return crypto.createHmac('sha256', secret)
                   .update(data)
                   .digest('hex');
}

exports.create = function (req, res) {
  if (req.body.password === req.body.verif) {
    req.body.password = hash(req.body.password)
    Users.create(req.body, function (err) {
      if (err) res.send(404)
      res.send(201)
    })
  } else {
    res.send(404)
  }
}

exports.getAll = function (req, res) {
  Users.find().exec(function (err, data) {
    if (err) res.send(404)
    res.send(200, data)
  })
}

exports.getOne = function (req, res) {
  Users.find({ _id: req.params.id }).exec(function (err, data) {
    if (err) res.send(404)
    res.send(200, data)
  })
}

exports.delete = function (req, res) {
  Users.find({ _id: req.params.id }).remove(function (err) {
    if (err) return res.send(404)
    return res.send(200)
  })
}

exports.modify = function (req, res) {
  if (req.body.password) {
    req.body.password = hash(req.body.password)
  }
  Users.update({ _id: req.params.id }, { $set: req.body }, function (err, data) {
    if (err) {
      res.send(404)
    } else {
      res.send(200, data)
    }
  })
}

exports.auth = function (req, res) {
  Users.find({ email: req.body.email, password: hash(req.body.password) }).exec(function (err, data) {
    if (data.length != 0) {
      return res.send(200, data)
    } else {
      res.send(403)
    }
  })
}
