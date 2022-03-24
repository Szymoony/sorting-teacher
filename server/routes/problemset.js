const fs = require('fs');
const router = require('express').Router();

const filepath = '../data/problemsets.json';
const leaderboardPath = '../data/leaderboards.json';

router.get('/', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    return res.json(JSON.parse(data));
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    return res.json(JSON.parse(data)[req.params.id]);
  });
});

router.post('/create', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    let t = JSON.parse(data);
    t.push(req.body);
    fs.writeFile(filepath, JSON.stringify(t), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.readFile(leaderboardPath, 'utf8', (err, data) => {
        let p = JSON.parse(data);
        p.push([]);
        fs.writeFile(leaderboardPath, JSON.stringify(p), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          res.sendStatus(200);
        });
      });
    });
  });
});

router.delete('/:id', (req, res) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    let t = JSON.parse(data);
    t.splice(req.params.id, 1);
    fs.writeFile(filepath, JSON.stringify(t), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.readFile(leaderboardPath, 'utf8', (err, data) => {
        let p = JSON.parse(data);
        p.splice(req.params.id, 1);
        fs.writeFile(leaderboardPath, JSON.stringify(p), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          res.sendStatus(200);
        });
      });
    });
  });
});

module.exports = router;
