const dotEnv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    const configfile = process.env.NODE_ENV === 'dev' ? './.env.dev' : './.env';
    dotEnv.config({ path: configfile });
}

module.exports = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
}
