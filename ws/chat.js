const io = require('../app');

io.on('connection', (client) => {
    console.log('New websocket connection');
    client.on('disconnect', () => {
      console.log('New websocket disconnected');
    });
});