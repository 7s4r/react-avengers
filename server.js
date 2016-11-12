const express = require('express')
const http = require('http')
const logger = require('morgan')
const path = require('path')
const app = express()

app.use(logger('dev'))

// Set static files dir
app.use(express.static(path.resolve('node_modules')))
app.use(express.static(path.resolve('public')))

// Serve main page
app.get('*', (req, res) => { res.sendFile(path.resolve('public/index.html')) })

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')

  err.status = 404
next(err)
})

// Error handler
app.use((err, req, res) => {
  res.status(err.status || 500)
res.send('ERROR')
})

const PORT = process.env.PORT || '3000'
const server = http.createServer(app)

server.listen(PORT, () => {
  console.info(`Listening on ${PORT}`)
})
