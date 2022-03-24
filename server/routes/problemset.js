const fs = require('fs');
const router = require('express').Router();

const filepath = './data/problemsets.json';

router.get('/', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    return res.json(data);
  } catch (err) {
    console.log('Get /', err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'))[req.params.id];
    return res.json(data);
  } catch (err) {
    console.log('Get /:id', err);
  }
});

router.post('/create', (req, res) => {
  let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  data.push(req.body);
  try {
    fs.writeFileSync(filepath, JSON.stringify(data));
    res.sendStatus(200);
  } catch (err) {
    console.log('POST /create', err);
  }
});

router.delete('/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  data.splice(req.params.id, 1);
  try {
    fs.writeFileSync(filepath, JSON.stringify(data));
    res.sendStatus(200);
  } catch (err) {
    console.log('POST /create', err);
  }
});

module.exports = router;
