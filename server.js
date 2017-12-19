var express = require('express');
var fs = require('fs');
var app     = express();
var request = require('request');
var https = require('https');
var _ = require('lodash');

var getData = function (url) {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, response, body) => {
      if (err) { reject(err); }
      resolve(response);
    });
  });

};

app.get('/api/posts/:post_id', function(req, res) {
  var post_id = parseInt(req.params.post_id, 10);
  var get_all_posts_url = 'https://jsonplaceholder.typicode.com/posts';
  console.log('post_id= ', post_id);
  getData(get_all_posts_url).then((html) = function (response) {
    var posts_list = response.body;
    var post = _.find(posts_list, function (post) {
      return post.id === post_id;
    })
    res.json({'posts' : post});
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