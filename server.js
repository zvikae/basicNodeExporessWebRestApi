var express = require('express');
var fs = require('fs');
var app     = express();
var request = require('request');
var https = require('https');
var _ = require('lodash');
app.use(express.static(__dirname + '/public'));  


var getData = function (url) {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, response, body) => {
      if (err) { reject(err); }
      resolve(response);
    });
  });
};

var removePostIdFromComments = function (comments) {
  var comments = _.map(comments, function(o) { return _.omit(o, 'postId'); });
  return comments;
};

app.get('/api/posts/:post_id', function(req, res) {
  var post_id = parseInt(req.params.post_id, 10);
  var get_all_posts_url = 'https://jsonplaceholder.typicode.com/posts';
  var comments_per_post = 'https://jsonplaceholder.typicode.com/posts/' + post_id + '/comments'
  Promise.all([
    getData(get_all_posts_url),
    getData(comments_per_post),
  ])
  .then(([result1, result2]) => {
    var posts_list = result1.body;
    var post = _.find(posts_list, function (post) {
      return post.id === post_id;
    })
    var comments = removePostIdFromComments(result2.body);
    post['comments'] = comments
    res.json({'post' : post});
  })
  .catch(err => {
      // Receives first rejection among the Promises
      res.json({'error' : err});
  });

})


    // application -------------------------------------------------------------
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;