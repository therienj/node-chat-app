//ici on crée les évenements client vers serveur
var socket = io();

function scrollToBottom () {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function ()  {
    console.log('Connecté au serveur.');   
});

socket.on('disconnect', function () {
    console.log('Déconnecté du serveur.');
});

// socket.on('newEmail', function(email){
//     console.log('Nouveau courriel', email);
// });

socket.on('newMessage', function(message){
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
       text: message.text,
       from: message.from,
       createdAt: message.createdAt
    });
    jQuery('#messages').append(html);
    scrollToBottom (); 
});

//mon code qui fonctionne pas mais devrait
// socket.on('newLocationMessage', function (message) {
//     var template = jQuery('#location-message-template').html();
//     var html = Mustache.render(template, {
//        from: message.from,
//        url: message.url
//       // createdAt: message.createdAt
//     });
//     jQuery('#messages').append(html);
//     scrollToBottom (); 
//  });

//mon code qui fonctionne
    socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target= "_blank">Ma position actuelle</a>');
    
    li.text(`${message.from} :  ${message.createdAt} : `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
    scrollToBottom (); 
});

//ici on crée l'évenement côté client (crée un message)
//il est trappé dans server.js par socket.on('createMessage'...

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Salutations du client'
// }, function (data) {
//     console.log('Data reçu', data);
// }); 

var soumettre = jQuery('#message-form');

soumettre.on('submit', function (e) {
    e.preventDefault();

    var fromTextBox = jQuery('[name=from]');
    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: fromTextBox.val(),
        text: messageTextBox.val()
    }, function () {
        fromTextBox.val('');
        messageTextBox.val('');
    });
});

//code de géolocalisation pour le button 'send-location'
var locationButton = jQuery('#send-location');
locationButton.on ('click', function () {
    if (!navigator.geolocation) {
        return alert('Géolocation pas supporté par votre fureteur.');
    }

    locationButton.attr('disabled','disabled').text('Envoi des coordonnées');

    navigator.geolocation.getCurrentPosition ( function (position){
        console.log(position);
        //cette ligne renvoi les coords à server.js qui les affichent
        locationButton.removeAttr('disabled').text('Envoyer coordonnées');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    
}, function (){
        locationButton.removeAttr('disabled').text('Envoyer coordonnées');
        alert('Impossible de trouver vos coordonnées.');
    });
});

