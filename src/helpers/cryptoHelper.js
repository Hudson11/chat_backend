const crypto = require('crypto');
const algorithm = process.env.ALGORITHM;
const key = crypto.scryptSync(process.env.PASSWORD, process.env.KEY_BINARYLIKE, parseInt(process.env.KEY_KEYLEN));
const iv = Buffer.alloc(16, 0); // Initialization vector.

module.exports = {

    criptografar: (senha) => {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        cipher.update(senha);
        return cipher.final(process.env.OUTPUT_ENCODING);
    },

    descriptografar: (senha) => {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        decipher.update(senha, process.env.OUTPUT_ENCODING);
        return decipher.final();    
    },

    compare: (senha, encrypted) => {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        decipher.update(encrypted, process.env.OUTPUT_ENCODING);
        const desc = decipher.final().toString();
        if(senha === desc)
            return true;
        return false;
    }
}