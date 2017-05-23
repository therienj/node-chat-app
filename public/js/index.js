//ici on crée les évenements client vers serveur

const Dte = Date("YYYY-mm-ddTHH:MM:ssZ");
var socket = io();

socket.on('connect', function ()  {
    console.log('Connecté au server après un refresh.');

    // socket.emit('createEmail', {
    //     to: 'un@abc.com',
    //     text: 'Hey c\'est Jacques',
    //     from: 'deux@mail.com'
    // });

//ici on crée l'évenemt côté client (crée un message)
//il est trappé dans server.js par socket.on('createMessage'...

    // socket.emit('createMessage', {
    //     from: 'De Moi',
    //     body: 'Là je crée un nouveau message',
    //     createdAt: Dte
    // });
});

socket.on('disconnect', function () {
    console.log('Déconnecté du serveur.');
});

// socket.on('newEmail', function(email){
//     console.log('Nouveau courriel', email);
// });

socket.on('newMessage', function(message){
    console.log('Nouveau message', message );
});