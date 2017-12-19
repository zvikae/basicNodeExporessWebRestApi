var express = require('express');
var fs = require('fs');
var app     = express();
var request = require('request');
var https = require('https');

var getComments = function () {
  return new Promise((resolve, reject) => {
    request('https://jsonplaceholder.typicode.com/comments', { json: true }, (err, response, body) => {
      if (err) { reject(err); }
      resolve(response);
    });
  });

};

app.get('/test', function(req, res) {
  var arr = 'https://jsonplaceholder.typicode.com/comments';
  var params = {
    data: 'Test Express'
  }
  getComments().then((html) = function (response) {
    res.json({'moshe' : response});
  }).catch((err) = function (reject) {
    res.json({'error' : reject});
  });

})


    // application -------------------------------------------------------------
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;