export function ObjectLength(object) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};
export function generatePassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+=/<>?{}|~.,:;ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 15;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
    }
    return password;
};