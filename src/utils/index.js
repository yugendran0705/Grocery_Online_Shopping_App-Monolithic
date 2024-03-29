const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DefinedError } = require('./error-handler');
const { jwtSecret } = require('../config/index');

generateSalt = async () => {
    return await bcrypt.genSalt(10);
}

generatePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}

validatePassword = async (enteredpassword, savedpassword) => {
    return await bcrypt.compare(enteredpassword, savedpassword);
}

generateToken = async (payload) => {
    return jwt.sign(payload, jwtSecret);
}

verifyToken = async (req) => {
    const signature = req.get("Authorization");
    const payload = jwt.verify(signature.split(" ")[1], jwtSecret);
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

