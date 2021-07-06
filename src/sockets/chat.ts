import * as socketio from 'socket.io'

const messages: any = []

export function sockets(io: socketio.Server) {

  io.on('connection', (socket) => {
  
    console.log(`new client session connection: ${socket.id}`)
  
    socket.emit('previousMessages', messages)
  
    socket.on('sendMessage', (data) => {
      console.log(data);
      messages.push(data)
      socket.broadcast.emit("receivedMessage", data);
    })
  
    socket.on('disconnect', () => {
      console.log(`user disconnected`)
    })
  })
}