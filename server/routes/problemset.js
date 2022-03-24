const fs = require('fs');
const router = require('express').Router();

const filepath = '../data/problemsets.json';

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
      res.sendStatus(200);
    })
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
      res.sendStatus(200);
    })
  })
});

module.exports = router;
