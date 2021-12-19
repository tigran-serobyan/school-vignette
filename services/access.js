var accessList = [];
var reader = require('fs-extra');
var _username, _password;
reader.readJson('./config.json').then(res => {
    _username = res.username;
    _password = res.password;
}).catch(err => {
    console.error(err);
});

function haveAccess(cookie) {
    for (let i of accessList) {
        if (i == cookie) {
            return true;
        }
    }
    return false;
}
function newAccess(username, password) {
    if (username == _username && password == _password) {
        let access = (new Date()).getTime();
        accessList.push(access);
        return access;
    } else {
        return '';
    }
}
module.exports = { haveAccess, newAccess }