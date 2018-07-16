import io from 'socket.io-client'

import config from './../config'

let socket = null

export const startSocket = (user) => {
  console.log('dawdnawiodaidniawndniaindawiodnawdi')
  if (!socket) {
    socket = io.connect(config.apiSocketUrl)
  }

  socket.on('connect', () => {
    console.log('socket connect')
    socket.emit('login', user)
  })

  socket.on('disconnect', () => {
    console.log('socket disconnect')
  })

  socket.on('update', (data) => {
    console.log(data, 'socketData')
  })

  return socket
}

export const getSocket = () => socket
