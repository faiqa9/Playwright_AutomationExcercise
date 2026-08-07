function getTodayDate() {
    const today = new Date();

    return today.toISOString().split('T')[0];
}

function getFutureDate(days) {
    const date = new Date();

    date.setDate(date.getDate() + days);

    return date.toISOString().split('T')[0];
}

function getPastDate(days) {
    const date = new Date();

    date.setDate(date.getDate() - days);

    return date.toISOString().split('T')[0];
}

module.exports = {
    getTodayDate,
    getFutureDate,
    getPastDate
};