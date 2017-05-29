var expect = require('expect');
//var moment = require('moment');

var  {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Doit créé un objet message ', () => {
        var from = 'Admin';
        var text = 'Bienvenue dans App';
        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('Devrait créé un URL pour la localisation', () => {
        var from = 'Moi';
        var latitude = 1;
        var longitude = 2;
        var url = 'https://www.google.com/maps?q=1,2'

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});
