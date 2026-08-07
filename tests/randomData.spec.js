const { test } = require('@playwright/test');
const {
    randomEmail,
    randomName,
    randomPhone,
    randomPassword
} = require('../utils/randomData');

test('Generate Random Test Data', async () => {

    console.log('Email:', randomEmail());
    console.log('Name:', randomName());
    console.log('Phone:', randomPhone());
    console.log('Password:', randomPassword());

});