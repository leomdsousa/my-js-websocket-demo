const express = require('express')
const http = require('http') 
const webSocket = require('ws')
const port = process.env.PORT || 9898

const app = express()

const server = http.createServer(app)

const wss = new webSocket.Server({ server })

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('New message received:' + message.toString())
        console.log('Echo message received...')
        ws.send(message.toString())
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${server.address().port}`)
})