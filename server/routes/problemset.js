var express = require('express');
var fs = require('fs');
const { append } = require('vary');
var router = express.Router();

var i = 1;

router.get('/', (req, res) => {
  res.send('GET Problem Set');
});

//whenever "/create" is called, index of file increases by one.
//Instead of "LIst of Nums", {algoType, listOfnum} will be added in the file
router.get('/create', (req, res) => {
  fs.writeFile(`./data/problemset${i}.json`, 'LIST of NUMs', function (err) {});
  fs.readFile(`./data/problemset${i}.json`, 'utf8', function (err, data) {
    i++;
    res.end(data);
  });
});
//localhost:4000/delete/"2"
router.get('/delete/:id', (req, res) => {
  fs.unlink(`./data/problemset${req.params.id}.json`, function (err) {
    console.log(`./data/problemset${req.params.id}.json`);
    res.send('Deleted');
  });
});

router.get('/update/:id', (req, res) => {
  fs.unlink(`./data/problemset${req.params.id}.json`, function (err) {
    fs.writeFile(`./data/problemset${req.params.id}.json`, 'Contents UPdated', function (err) {
      res.send('Updated');
    });
  });
});

module.exports = router;
