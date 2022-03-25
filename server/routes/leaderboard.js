const fs = require('fs');
const router = require('express').Router();

const filepath = '../data/leaderboards.json';

router.get('/:id', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    return res.json(JSON.parse(data)[req.params.id]);
  });
});

module.exports = router;
