const { test } = require('@playwright/test');
const {
    getTodayDate,
    getFutureDate,
    getPastDate
} = require('../utils/dateUtil');

test('Generate Dates', async () => {

    console.log('Today:', getTodayDate());

    console.log('7 Days Later:', getFutureDate(7));

    console.log('7 Days Earlier:', getPastDate(7));

});