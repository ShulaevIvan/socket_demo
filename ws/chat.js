const io = require('../app');

io.on('connection', (socket) => {
    console.log('New websocket connected');
    updateClients('checkUsers');
    const room = (`room_${socket.id}`);
    socket.join(room);
    socket.emit('connected', socket.id);

    socket.on('disconnect', () => {
      socket.disconnect();
      updateClients('checkUsers');
      console.log('New websocket disconnected');
    });

    socket.on('message', (msgData) => {
      msgData.user = socket.id;
      io.sockets.emit('message', msgData);
    });

    socket.on('private', (msg) => {
      const room = (`room_${msg.msgTo}`);
      socket.join(room);
      io.sockets.in(room).emit('private', msg);
    });
});

const updateClients = (event) => {
  const clients = Array.from(io.sockets.sockets).map(socket => socket[0]);
  io.sockets.emit(event, {users: clients});
};
