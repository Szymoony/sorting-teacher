const express = require('express');
const cors = require('cors');
const app = express();
const problemset = require('./routes/problemset');
const leaderboard = require('./routes/leaderboard');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/problemset', problemset);
app.use('/problemset/leaderboard', leaderboard);

app.listen(3001, function () {
  console.log('Local: http://localhost:3001/problemset');
});
