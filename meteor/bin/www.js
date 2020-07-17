const http = require('http')
const { HOST, PORT } = require('../config/index')
const app = require('../app')

const server = http.createServer(app.callback())

server.listen(PORT)

server.on('listening', () => {
  console.log(`listening: ${HOST}${PORT}`)
})
