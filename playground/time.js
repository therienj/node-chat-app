var moment = require('moment');

var Dte = moment.locale("fr");
Dte = moment().format('dddd d MMM YYYY h:mm:ss a');
console.log(Dte);