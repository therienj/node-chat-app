var expect = require('expect');
//var request = require('supertest');

var  {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Doit créé un objet message ', () => {
        var from = 'Admin';
        var text = 'Bienvenue dans App';
        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('string');
    });
});