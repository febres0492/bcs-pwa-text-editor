const path = require('path');
const express = require('express');

module.exports = (app) => {
    // Serve the favicon
    app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));

    // Serve the main HTML file
    app.get('/', (req, res) =>
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    );
};
