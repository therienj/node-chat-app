const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Nouvel usager');

    socket.emit('newEmail', {
        from: 'abc@mail.com',
        body: 'Salut et bon voyage',
        to: 'cba@mail.com'
    });

    socket.on('disconnect', ()=>{
        console.log('Client déconnecté.');   
    });
});

io.on('disconnect', () => {
    console.log('Client déconnecté.');
});

server.listen(port, () =>{
    console.log(`Serveur démarré sur le port ${port}`);
});

