const Dte = Date("YYYY-mm-ddTHH:MM:ssZ");

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: Dte
    }
};

module.exports = {generateMessage};