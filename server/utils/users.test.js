const expect = require('expect');

const{Users} = require('./users');

describe('Users',() => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Cours NodeJs'
        }, {
            id: 2,
            name: 'Junior',
            room: 'Cours React'
        }, {
            id: 3,
            name: 'Moi',
            room: 'Cours NodeJs'
        }];
    });

    it('Doit ajouter un usager', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Jacques',
            room: 'La chambre' 
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Doit retourner une liste usager NodeJs.', () => {
        var userList = users.getUserList('Cours NodeJs');

        expect (userList).toEqual(['Mike', 'Moi']);
    });

    it('Doit retourner une liste usager React.', () => {
        var userList = users.getUserList('Cours React');

        expect (userList).toEqual(['Junior']);
    });
    
    it('Doit supprimer un usager.', () => {
        var userId = 1;
        var user = users.removeUser(userId);
        expect (user.id).toBe(userId);
    });

    it('Ne doit pas supprimer un usager.', () => {
        var userId = 99;
        var user = users.removeUser(userId);
        expect (user).toBe(undefined);
        expect (user).toNotExist();
    });
  

    it('Doit chercher et trouver un usager.', () => {
        var userId = 2;
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('Ne doit pas trouver un usager.', () => {
        var userId = 99;
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });
});