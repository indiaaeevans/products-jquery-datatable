var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/rows', function (req, res, next) {

  const start = req.query.start ? parseInt(req.query.start) : 0;
  const length = req.query.length ? parseInt(req.query.length) : 10;
  const draw = req.query.length ? parseInt(req.query.draw) : 1;
  // convert starting record into page number
  const pageNumber = Math.ceil(start / length) + 1;

  let options = {
    uri: 'http://localhost:3000/products',
    // qs - object containing querystring values to be appended to the uri
    qs: {
      _page: pageNumber,
      _limit: length
    }
  }

  let createDataTablesResponse = (error, response, body) => {
    const totalRecords = response.headers['x-total-count'];
    res.send({
      draw: draw,
      recordsFiltered: totalRecords,
      recordsTotal: totalRecords,
      data: JSON.parse(body)
    })
  }
  
  request(options, createDataTablesResponse);

});

module.exports = router;