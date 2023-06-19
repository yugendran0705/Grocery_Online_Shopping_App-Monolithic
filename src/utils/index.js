const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DefinedError = require('./error-handler');

const { JWT_SECRET } = require('../config');

generateSalt = async () => {
    return await bcrypt.genSalt(10);
}

generatePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}

validatePassword = async (enteredpassword, savedpassword, salt) => {
    return (await this.generatePassword(enteredpassword, salt)) === savedpassword;
}

generateToken = async (payload) => {
    return jwt.sign(payload, JWT_SECRET);
}

verifyToken = async (req) => {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], JWT_SECRET);
    req.user = payload;
    return true;
}

formatData = (data) => {
    if (data) {
        return data;
    }
    else {
        return DefinedError("Data not found", 404);
    }
}

module.exports = {
    generateSalt,
    generatePassword,
    validatePassword,
    generateToken,
    verifyToken,
    formatData
}

