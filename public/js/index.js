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

    
});

socket.on('disconnect', function () {
    console.log('Déconnecté du serveur.');
});

// socket.on('newEmail', function(email){
//     console.log('Nouveau courriel', email);
// });

socket.on('newMessage', function(message){
    console.log(message.text + ' de ' + message.from );
    console.log(message);
    txt = message.text;
    var li = jQuery('<li></li>');
    li.text(`${message.from}:  ${message.text}`);

    jQuery('#messages').append(li);

});


//ici on crée l'évenement côté client (crée un message)
//il est trappé dans server.js par socket.on('createMessage'...

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Salutations du client'
// }, function (data) {
//     console.log('Data reçu', data);
// }); 

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: jQuery('[name=from]').val(),
        text: jQuery('[name=message]').val()
    }, function () {

    });
});