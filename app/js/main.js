
require('angular');
require('angular-route');
require('angular-animate');
require('angularfire');

var config = {};

config = {
     // apiKey: "AIzaSyDs4BkehVOwJg4vpvgnbh34oJUPVBKhA70 ",
     // authDomain: "angular-js-training.firebaseapp.com",
     // databaseURL: "https://angular-js-training.firebaseio.com",
     // storageBucket: "angular-js-training.appspot.com",
     // messagingSenderId: "359711215515"
};

firebase.initializeApp(config);


var mainCtrl = require('./controllers/mainctrl');


angular.module('app', ['ngRoute', 'ngAnimate', 'firebase'])
     .constant('global_config', {
          routes: {
          // put global routes here
          }
     })

     .config( function($locationProvider, $routeProvider, $firebaseRefProvider) {
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
          .otherwise({
               redirectTo: '/'
          });
     })

//Load controller
     .controller('MainController', ['$scope', '$firebaseRef', '$firebaseArray', '$location', mainCtrl]);