const md5 = require('md5');

function random(digits){
    let uid = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i=0; i< digits; i++) {
        uid += alphabet.charAt(Math.floor(Math.random()* alphabet.length));
    }
    return uid;
}

function base10to62(num) {
    let uid = "";
    const alphabet = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
    const base = alphabet.length;
    let quotient = + num
    while (quotient > base) {
        let mod = quotient % base;
        quotient = Math.floor(quotient / base);
        uid = alphabet[mod]+ uid;
        if (quotient === base) {
            quotient = Math.floor(quotient / base);
        }
    }
    uid = alphabet[quotient] + uid;
    return uid;
}

async function md5Digest (message) {
    let  digest = md5(message);
    let hashArr = digest.split("");
    
    let arr = [];
    for (let i = 0; i < 4;i++ ){
        arr.push(hashArr.splice(0,8).join(""))
    }
    arr = await arr.map((value) => {
        const mask = 1073741823;
        let binary  = (parseInt(value, 16) & mask).toString(2);
        while(binary.length < 30) {
            binary = "0" + binary;
        } 
        return binary
    });
    let uids = await arr.map((value) => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let binary = value;
        const mask = 61;
        let uid = '';
        while (uid.length < 6) {
            uid = uid + alphabet[parseInt(binary.split("").splice(-6, 6).join(""), 2) & mask];
            binary = (parseInt(binary, 2) >> 5).toString(2)
        }
        return uid;
    });

    return uids;
}

module.exports = {
    random: random,
    base10to62: base10to62,
    md5Digest: md5Digest
}

