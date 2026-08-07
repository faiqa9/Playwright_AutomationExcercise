function randomEmail() {
    return `user${Date.now()}@gmail.com`;
}

function randomName() {
    return `User${Math.floor(Math.random() * 10000)}`;
}

function randomPhone() {
    return `03${Math.floor(100000000 + Math.random() * 900000000)}`;
}

function randomPassword() {
    return `Pass@${Math.floor(Math.random() * 100000)}`;
}

module.exports = {
    randomEmail,
    randomName,
    randomPhone,
    randomPassword
};