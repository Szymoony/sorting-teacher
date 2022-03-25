const fs = require('fs');
const router = require('express').Router();

const filepath = '../data/leaderboards.json';

router.get('/:id', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    return res.json(JSON.parse(data)[req.params.id]);
  });
});

router.post('/:id', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    let leaderboard = JSON.parse(data)[req.params.id];
    leaderboard.push(JSON.parse(req.body));
    fs.writeFile(filepath, JSON.stringify(leaderboard), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      res.sendStatus(200);
    });
  });
});

module.exports = router;
