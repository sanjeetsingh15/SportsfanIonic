// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('page1', {
      url: '',
      templateUrl: 'page1.html'
    })
    
    .state('page2', {
      url: '/login',
      templateUrl: 'page2.html'
    })
    
    .state('page3', {
      url: '/signup',
      templateUrl: 'page3.html'
    })
    
    .state('side-menu3', {
      url: '/menu',
      templateUrl: 'side-menu3.html'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('');
  

})

	.controller('mainForm', [ '$scope', '$state', '$http', function($scope, $state, $http) {
        $http.get("http://sportfan-app.netsol.local/sportfan/services/getAllFeeds/page:1")
  .success(function (response) { $scope.feeds = response.feeds; });
		$scope.signIn = function() {
			$scope.navTitle = 'Sign In';
            $state.go('page2');
        };
		$scope.signUp = function() { 
			$scope.navTitle = 'Sign Up';
            $state.go('page3');
        };
		$scope.guestNews = function() {
			$scope.navTitle = 'News Feed';
            $state.go('side-menu3');
        }
    }])
	
	.controller('mainForm2', [ '$scope', '$http', function($scope, $http) {
        $http.get("http://sportfan-app.netsol.local/sportfan/services/getAllFeeds/page:1")
  .success(function (response) { $scope.feeds = response.feeds; });
    }])
	
	.controller('mainForm1', [ '$scope', '$http', function($scope, $http) {
        
		$scope.MyLogin = function(){
			var email = $scope.email;
			var password = $scope.password;
			$scope.email = email + password;
		}
    }])
	


