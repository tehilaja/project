var aes = require('aes-js');

const key = [ 11, 12, 54, 74, 25, 43, 75, 28, 39, 110, 63, 12, 1, 29, 36, 6 ];

const encrypt = (text) => {
    var textBytes = aes.utils.utf8.toBytes(text);
 
    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    
    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);

    return encryptedHex;
}

const decrypt = (encryptedHex) => {
    var encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
 
    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    
    // Convert our bytes back into text
    var decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);

    return decryptedText;
}

exports.methods = {
    encrypt: encrypt,
    decrypt: decrypt,
}
