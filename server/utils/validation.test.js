const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString',() => {
 it('Doit être une chaine valable', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
 });

 it('Doit refuser les blancs.', ()  => {
    var res = isRealString('     ');
    expect(res).toBe(false);
 });

 it('Permet les blancs avec autres charactères  .', ()  => {
    var res = isRealString('Une phrase avec blanc');
    expect(res).toBe(true);
 });
});

