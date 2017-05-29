var moment = require('moment');

var Dte = moment.locale("fr");
Dte = moment().format('ddd do MMM YYYY hh:mm:ss a');
console.log(Dte);