var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.init = function () {
    $scope.post_id = null;
    $scope.table_headers = null;
    $scope.table_data = null;
    $scope.post_keys = null;
    $scope.post_data = null;
  };

  self.resetErrorMsg = function () {
    $scope.error = {
      show: false,
      msg: ''
    }
  };

  self.getDataFromServer = function (url) {
    return $http({
      method: 'GET',
      url: url
    });
  };

  self.initCommentsData = function (resolve) {
    if (resolve.data.post && resolve.data.post.comments) {
      $scope.table_headers = _.keys(resolve.data.post.comments[0]);
      $scope.table_data = resolve.data.post.comments;
    } else {
      $scope.error = {
        msg: 'No comments to show',
        show: true
      }
    }
  };

  self.initPostData = function (resolve) {
    if (!resolve.data.post) {return; }
    $scope.post_data = _.omit(resolve.data.post, ['comments']);
    $scope.post_keys = _.keys($scope.post_data)
  };

  self.resolveGetComments = function (resolve) {
    console.log(resolve.data.post);
    self.initCommentsData(resolve);
    self.initPostData(resolve);
  };

  self.getPostData = function () {
    var url = 'http://localhost:8081/api/posts/' + $scope.post_id;
    self.getDataFromServer(url).then(function (resolve) {
      self.resolveGetComments(resolve);
    }, function(reject) {
      $scope.error = {
        msg: reject,
        show: true
      }
    });
  }

  $scope.getComments = function () {
    self.resetErrorMsg();
    self.getPostData();
  };
}]);