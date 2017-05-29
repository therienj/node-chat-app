var moment = require('moment');

 var Dte = moment.locale("fr");
// les formats suivant s'équivalent
// Dte = moment().format('dddd do MMM YYYY hh:mm:ss a');
 Dte = moment().format('LLLL a');

var generateMessage = (from, text, createdAt) => {
    return {
        from,
        text,
        createdAt: Dte
    };
};

var generateLocationMessage = (from, latitude, longitude, createdAt) => {
    return{
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: Dte
    };
};


module.exports = {generateMessage,generateLocationMessage};