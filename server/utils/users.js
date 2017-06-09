[{
    id:'/#12fkldr45565742xcxg',
    name: 'Jacques',
    room: 'La chambre'
}]

//adduser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)

// class Personne {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} est âgé(e) de ${this.age}.`;
//     }
// }

// var me = new Personne('Jacques', 59);
// var desc = me.getUserDescription();
// console.log(desc);

class Users {
    constructor () {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
           this.users = this.users.filter((user) => user.id !== id );
        }   

        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];

    }

    getUserList(room) {
        var users = this.users.filter ((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray; 
    }

}

module.exports = {Users};