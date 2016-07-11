module.exports = function(app) {


// Missions
var Mission = require('./models/mission')
app.post('/missions', Mission.create)
app.get('/missions', Mission.getAll)
app.get('/missions/:id', Mission.getOne)
app.put('/missions/:id', Mission.update)
app.del('/missions/:id', Mission.delete)

// Consultants
var Consultants = require('./models/consultant')
app.post('/consultants', Consultants.create)
app.get('/consultants', Consultants.getAll)

// Actualité
var News = require('./models/news')
app.get('/news', News.getAll)
app.get('/news/:slug', News.getOne)
app.post('/news', News.create)
app.del('/news/:id', News.delete)

// Users
var Users = require('./models/users')
app.post('/user', Users.create)
app.get('/user', Users.getAll)
app.get('/user/:id', Users.getOne)
app.del('/user/:id', Users.delete)
app.post('/user/auth', Users.auth)
app.put('/user/:id', Users.modify)

}
