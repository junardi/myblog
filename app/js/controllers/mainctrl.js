module.exports = function($scope, $firebaseRef, $firebaseArray) {
	$scope.test = "Testing...";

	$scope.hello = "Hello World!";

	var itemsRef = $firebaseRef.items;    

	$scope.items = $firebaseArray(itemsRef);            

	console.log($scope.items);

};