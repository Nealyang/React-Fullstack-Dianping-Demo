const express = require('express');
let app = express();
app.use('/',express.static('build'));
const server = app.listen(2000,function () {
    let port = server.address().port;
    console.log('Open http://localhost:%s', port);
});