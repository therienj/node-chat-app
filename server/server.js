//ici on crée les évenements côté server (reçoit le message) vers client (envoi au client browser)

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const{generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
   
    console.log('Nouvel usager connecté');

//la manière d'émettre un évenement on le trappe dans index.js avec
//socket.on('newMessage'...

    socket.emit('newMessage',  generateMessage('Admin', 'Bienvenue dans App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Un nouvel usage'));

    socket.on('createMessage', (message, callback) => {
        //console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

//code pour transmettre les coords reçu de index.js
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage ('Admin', coords.latitude,coords.longitude));
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

