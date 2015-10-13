// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

//angular.module('starter', ['ionic'])

.run(function($ionicPlatform, feeds) { 
/*feeds.teams().then(
		  function( response ) { //console.log(response.leagues);
				
                for(var i = 0; i<response.leagues.length; i++){
                    //console.log(i);
                    //console.log(response.leagues[i].League);
                   // TeamDB.add(response.leagues[i].League);
                }
            }
		); */
      //  var abc = TeamDB.all(); console.log("hi"); console.log(abc);
        
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(false);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  /**  
    if(window.cordova) {
      // App syntax
      db = window.sqlitePlugin.openDatabase({name: "SportsFan.db", location: 1});
    } else {
      // Ionic serve syntax
      db = window.openDatabase("SportsFan.db", "1.0", "My SportsFan", -1);
    }

    db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS League (league_id integer primary key, league_name text, league_image text)');

    
 * tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 500], function(tx, res) {
 *       console.log("insertId: " + res.insertId + " -- probably 1");
 *       console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

 *       tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
 *         console.log("res.rows.length: " + res.rows.length + " -- should be 1");
 *         console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
 *       });

 *     }, function(e) {
 *       console.log("ERROR: " + e.message);
 *     });
 
  }); */
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    /**
 * function resolve(timeout) {
 *       return {
 *         data: function($q, $timeout) {
 *           var deferred = $q.defer();
 *           $timeout(function () {
 *             deferred.resolve(console.log("hi"));
 *           }, timeout);
 *           return deferred.promise;
 *         }
 *       };
 *     }
 */
    $ionicConfigProvider.backButton.previousTitleText(false);
    
   if(!ionic.Platform.isIOS())$ionicConfigProvider.scrolling.jsScrolling(false);
     
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
        //controller: 'AppCtrl'
      })
    
      .state('app.news', {
        url: '/news',
        views: {
          'menuContent': {
            templateUrl: 'templates/news.html'          
            //controller: 'newsListing'
          }
        }
      })
      
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
            //controller: 'newsListing'
          }
        }
      })
      
      .state('app.information', {
        url: '/information',
        views: {
          'menuContent': {
            templateUrl: 'templates/information.html'
            //controller: 'infoCtrl'
          }
        }
      })
      
      .state('app.contactus', {
        url: '/contactus',
        views: {
          'menuContent': {
            templateUrl: 'templates/contactus.html'
            //controller: 'contCtrl'
          }
        }
      })
      
      .state('app.comments', {
        url: '/news/:feedId',
        views: {
          'menuContent': {
            templateUrl: 'templates/comments.html'
            //controller: 'commentsController'
          }
        }
      })
      
      .state('app.teams', {
        url: '/teams',
        views: {
          'menuContent': {
            templateUrl: 'templates/teams.html'
            //controller: 'signupCtrl'
          }
        }
      })
      
      .state('app.teamsinfo', {
        url: '/teams/:team_id',
        views: {
          'menuContent': {
            templateUrl: 'templates/teamsinfo.html'
            //controller: 'signupCtrl'
          }
        }
      })
      
      .state('app.teamfeeds', {
        url: '/teams/:team_id/:teams_id/:team_name/:team_logo',
        views: {
          'menuContent': {
            templateUrl: 'templates/teamfeeds.html'
          }
        }
      })
      
      .state('app.page2', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'validateCtrl'
          }
        }
      })
      
      .state('app.page3', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
          }
        }
      })
      
      .state('app.myteam', {
        url: '/myteam',
        views: {
          'menuContent': {
            templateUrl: 'templates/myteam.html'
            //controller: 'signupCtrl'
          }
        }
      })
      
      .state('app.events', {
        url: '/events',
        views: {
          'menuContent': {
            templateUrl: 'templates/events.html'
            //controller: 'signupCtrl'
          }
        }
      })
      
      .state('app.myprofile', {
        url: '/myprofile',
        views: {
          'menuContent': {
            templateUrl: 'templates/myprofile.html'
            //controller: 'signupCtrl'
          }
        }
      })
      
    .state('page1', {
      url: '/home',
      templateUrl: 'templates/home.html'
      //controller: 'homeCtrl'
    })
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/news');
})