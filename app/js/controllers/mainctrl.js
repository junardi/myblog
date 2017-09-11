module.exports = function($scope, $firebaseRef, $firebaseArray, $firebaseObject) {
	
	var usersdataRef = $firebaseRef.usersdata;    
	$scope.usersdata = $firebaseObject(usersdataRef);            
	console.log($scope.usersdata);      

	$scope.usersdata.$loaded().then(function(data) {
		//console.log(data === obj); // true   
		console.log("Users data are loaded");
	}).catch(function(error) {
		console.error("Error:", error);
	});   

	var unwatch = $scope.usersdata.$watch(function() {
	  console.log("usersdata changed!");
	});


	$scope.item = "Value";   
	$scope.addItem = function() { 
		console.log("Let's add an item");
	};       

	var itemsRef = $firebaseRef.items;
	var itemsArray = { 
		name: "First item"
	};
	itemsRef.push(itemsArray);


};