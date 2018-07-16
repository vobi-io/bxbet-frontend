import io from 'socket.io-client'

import config from './../config'

let socket = null

export const startSocket = (user) => {
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

  return socket
}

export const getSocket = () => socket
