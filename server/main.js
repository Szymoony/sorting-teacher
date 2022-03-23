const express = require('express');
const app = express();
const problemset = require('./routes/problemset');

app.use('/problemset', problemset);

app.listen(3001, function() {
    console.log('Local: http://localhost:3001/problemset');
});
