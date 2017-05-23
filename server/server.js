//ici on crée les évenements côté server (reçoit le message) vers client (envoi au client browser)
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Dte = Date("YYYY-mm-ddTHH:MM:ssZ");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Nouvel usager');

    // socket.emit('newEmail', {
    //     from: 'normand@mail.com',
    //     body: 'Salut et bon voyage',
    //     to: 'diane@mail.com'
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.emit('newMessage', {
        from: 'Un Tel',
        body: 'Salut et bon voyage',
        createdAt: Dte

    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
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

