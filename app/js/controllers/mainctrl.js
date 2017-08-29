module.exports = function($scope, $firebaseRef, $firebaseArray) {
  $scope.test = "Testing...";

  $scope.hello = "Hello World!";

  var usersRef = $firebaseRef.users;
  console.log("required!");
};