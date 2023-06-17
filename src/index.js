const express = require('express');
const { port } = require('./config');


const startServer = async () => {
    const app = express();

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
        .on('error', (err) => {
            console.log(`Error: ${err}`);
            process.exit();
        })
}

startServer();