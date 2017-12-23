var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.init = function () {
    self.getPostData();
  };

  self.getDataFromServer = function (url) {
    return $http({
      method: 'GET',
      url: url
    });
  };

  self.getPostData = function () {
    var url = 'http://localhost:8081/api/posts/2';
    self.getDataFromServer(url).then(function (resolve) {
      console.log(resolve.data);
    }, function(reject) {
      
    });
  }
}]);