const io = require('../app');


io.on('connection', (socket) => {
    console.log('New websocket connected');
    updateClients('checkUsers');


    socket.on('disconnect', () => {
      socket.disconnect();
      updateClients('checkUsers');
      console.log('New websocket disconnected');
    });

    socket.on('message', (msgData) => {
      msgData.user = socket.id;
      io.sockets.emit('message', msgData);
    });
});

const updateClients = (event) => {
  const clients = Array.from(io.sockets.sockets).map(socket => socket[0]);
  io.sockets.emit(event, {users: clients});
};
