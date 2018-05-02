var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())

var port = process.env.PORT || 8080

var todos = require('./todos.js')

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('sorry, no such todos found: ' + request.params.slug)
    return
  }
  response.json(products[request.params.slug])
})

app.post('/todos', function (request, response) {
  var slug = request.body.job.trim().toLowerCase().split(' ').join('-')
  products[slug] = {
    job: request.body.job,
    status: request.body.status
  }
  response.redirect('/todos/' + slug)
})

app.delete('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('sorry, no such todos found: ' + request.params.slug)
    return
  }
  delete todos[request.params.slug]
  response.redirect('/todos')
})

app.put('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('sorry, no such todos found: ' + request.params.slug)
    return
  }
  var todo = todos[request.params.slug]
  if (request.body.job !== undefined) {
    todo.job = request.body.job.trim()
  }
  if (request.body.status !== undefined) {
    todo.status = request.body.status.trim()
  }
  response.redirect('/products/' + request.params.slug)
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)
