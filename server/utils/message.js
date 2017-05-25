const Dte = Date("YYYY-mm-ddTHH:MM:ssZ");

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: Dte
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return{
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: Dte
    };
};


module.exports = {generateMessage,generateLocationMessage};