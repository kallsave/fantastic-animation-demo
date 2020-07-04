const app = require('../app')
const http = require('http')

const port = process.env.PORT || '4006'

const server = http.createServer(app.callback())

server.listen(port)

server.on('listening', () => {
  console.log('listening: localhost:4006')
})
