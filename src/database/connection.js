const mongoose = require('mongoose');
const { dbUrl } = require('../config');

const connect = async () => {
    try {
        await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected');
    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}

module.exports = {
    connect
}