const fs = require('fs');
const router = require('express').Router();

var i = 1;

const filepath = './data/problemsets.json';

router.get('/', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//whenever "/create" is called, index of file increases by one.
//Instead of "LIst of Nums", {algoType, listOfnum} will be added in the file
router.post('/', (req, res) => {
  fs.writeFile(`./data/problemset${i}.json`, 'LIST of NUMs', function (err) {});
  fs.readFile(`./data/problemset${i}.json`, 'utf8', function (err, data) {
    i++;
    res.end(data);
  });
});
//localhost:4000/delete/"2"
router.delete('/:id', (req, res) => {
  fs.unlink(`./data/problemset${req.params.id}.json`, function (err) {
    console.log(`./data/problemset${req.params.id}.json`);
    res.send('Deleted');
  });
});

router.put('/:id', (req, res) => {
  fs.unlink(`./data/problemset${req.params.id}.json`, function (err) {
    fs.writeFile(`./data/problemset${req.params.id}.json`, 'Contents UPdated', function (err) {
      res.send('Updated');
    });
  });
});

module.exports = router;
