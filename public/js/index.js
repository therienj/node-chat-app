var socket = io();

socket.on('connect', function ()  {
    console.log('Connecté au server après un refresh.');
});

socket.on('disconnect', function () {
    console.log('Déconnecté du serveur.');
});

socket.on('newEmail', function(email){
    console.log('Nouveau courriel', email);
});