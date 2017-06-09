//ici on crée les évenements côté server (reçoit le message) vers client (envoi au client browser)

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const{generateMessage, generateLocationMessage} = require('./utils/message');
const{isRealString} = require ('./utils/validation');
const{Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {
   
    console.log('Nouvel usager connecté');

//la manière d'émettre un évenement on le trappe dans index.js avec
//socket.on('newMessage'...


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Le nom et la chambre sont requis.');
        } 
        //console.log('socketOn join', params.name, params.room, socket.id );
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        
        

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage',  generateMessage('Admin', 'Bienvenue dans App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} vient de se joindre à la chambre : ${params.room}`));
        callback();
        
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

//code pour transmettre les coords reçu de index.js
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage (user.name, coords.latitude,coords.longitude));
        }
    });



    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
            console.log('usager : ', user.name, ' qui a quitté la chambre : ', user.room, socket.id );
        if (user) {   
            io.to(user.room).emit('updateUserList', users.getUserList(user.room) )
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} a quitté la chambre ${user.room}` ));
        }
    });
});

server.listen(port, () =>{
    console.log(`Serveur démarré sur le port ${port}`);
});




