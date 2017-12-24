var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.init = function () {
    self.getPostData();
    $scope.post_id = null;
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

  self.resolveGetComments = function (resolve) {
    console.log(resolve.data.post);
    if (resolve.data.post && resolve.data.post.comments) {
      $scope.table_headers = Object.keys(resolve.data.post.comments[0]);
      $scope.table_data = resolve.data.post.comments;
    } else {
      $scope.error = {
        msg: 'No comments to show',
        show: true
      }
    }
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