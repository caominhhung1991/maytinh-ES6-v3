const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Send all other requests to the Angular app
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Set Port
const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
 
server.listen(port, () => {
    console.log(`Running on localhost - :${port}`);
});

module.exports = server;