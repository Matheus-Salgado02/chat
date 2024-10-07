const express = require('express')
const app = express()

app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = 9000

http.listen(porta, function(){
    console.log('Iniciando servidor....')

})

app.get('/',function(req, resp){
    resp.sendFile(__dirname+'/index.html')

})


serverSocket.on('connection',function(socket){
    console.log('Cliente conectado: ' + socket.id)

    socket.on('chat msg',function(mensagem){
        console.log(`Mensagem recebida: ${mensagem}`)
        serverSocket.emit('chat msg', mensagem)
    })
})
