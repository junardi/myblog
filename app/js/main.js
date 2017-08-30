
require('angular');
require('angular-route');
require('angular-animate');
require('angularfire');

var config = {};

config = {
     apiKey: "AIzaSyD2GZ7I0ZaWK2Z16fm8CLqvqb3DiS3UIj8",
     authDomain: "myblog-80f2e.firebaseapp.com",
     databaseURL: "https://myblog-80f2e.firebaseio.com",
     storageBucket: "",
     messagingSenderId: "515114687685"
};

firebase.initializeApp(config);


var mainCtrl = require('./controllers/mainctrl');   
var homeCtrl = require('./controllers/home');


var app = angular.module('app', ['ngRoute', 'ngAnimate', 'firebase']);  

app.constant('global_config', {
     routes: {
     // put global routes here
     }
});

app.config( function($locationProvider, $routeProvider, $firebaseRefProvider, global_config) {
     $locationProvider.hashPrefix(''); 
   
     $firebaseRefProvider.registerUrl({
          default: config.databaseURL,
     });
     // routes
     $routeProvider
     .when("/", {
          templateUrl: "./views/view1.html",
          controller: "MainController"
     })   
     .when("/home", { 
          templateUrl: "./views/home.html",   
          controller: "HomeController" 
     })
     .otherwise({
          redirectTo: '/'
     });
});

//Load controller
app.controller('MainController', ['$scope', '$firebaseRef', '$firebaseArray', '$location', mainCtrl]);   
app.controller('HomeController', ['$scope', '$firebaseRef', '$firebaseArray', '$location', homeCtrl]);