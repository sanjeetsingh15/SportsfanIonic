angular.module('starter.controllers', [])

.constant('constants', {
    appName: 'SportFan',
    appVersion: '2.0',
    apiUrl: 'http://sportfan-app.netsol.local/sportfan/',
    largeImagePath: '/img/team_logo_upload/large/',
    userProfileLargeImage: '/app/webroot/img/user_profile/large/',
    userProfileThumbImage: '/app/webroot/img/user_profile/thumb/'
})

// Left side navigation menu.html page controller..
.controller('eventsCtrl', function($scope, $state) {
    console.log("Evnentlsl");
    $scope.myEvents = function(event){
        console.log(event);
    }
    
})

// Single Team Feeds
.controller('teamFeedsCtrl', function($scope, $state, $ionicHistory, $stateParams, $ionicLoading, $rootScope, $timeout, feeds) {
    
    
    //OnState Change..
    $ionicLoading.show();
    $scope.$on('$ionicView.afterEnter', function(){
        //$ionicLoading.show();
        $scope.team_id =  $stateParams.team_id;
        $scope.team_name =  $stateParams.team_name;
        $scope.team_logo =  $stateParams.team_logo;
        
        getTeamNewsFeed($scope.team_id);
        
        $scope.$on('$stateChangeSuccess', function(){
            $ionicLoading.hide();   
        });
             
    });
    
    // Open link in mobile web browser..
		$scope.inAppBrowser = function(link) {
			var ref =window.open(link, '_blank', 'location=yes');
		};
        
        $scope.goHome =function(){
             feeds.nav($state, $ionicHistory);
        }
        
        
        // Pull down function..  
        $scope.doRefresh = function() {
            getTeamNewsFeed($scope.team_id);
            $scope.$broadcast('scroll.refreshComplete');
        };
	  
		$scope.goComment =function(feed_id) {
            $state.go("app.comments", { "feedId": feed_id});
        }
        
		$scope.likeUnlikeFeed =function(userId,flag,feedId) {
		    $ionicLoading.show();
			feeds.likeUnlike(userId,flag,feedId).then(
				function( response ) {
				        getTeamNewsFeed($scope.team_id);
                        $ionicLoading.hide();
					}
				);
		}
        
        // OnClick on add team..
        $scope.addTeam =function(team_id){
             AddRemoveTeam('1', team_id);
        }
    
    // OnClick on remove team..
        $scope.removeTeam =function(team_id){
             AddRemoveTeam('0', team_id);
        }
    
    // Add or Remove Team..
        function AddRemoveTeam(type,team_id){  //console.log(team_id);
            feeds.addRemoveTeam($rootScope.globals.currentUser.id, type, team_id).then(
    		function( response ) {
    		   getTeamNewsFeed($scope.team_id); 
               $ionicLoading.hide();
               feeds.toast(response.message, 'success');
            });
        }
    
    // List of my team..
    function getTeamNewsFeed(team_id){
         
        $ionicLoading.show();
        $timeout(function(){ console.log("hi");
            $ionicLoading.show();
        feeds.teamnewsfeed(team_id).then(
		  function( response ) {
            $scope.feeds = response.feeds;
            //console.log(response.feeds);
           //if(response.feeds.length == 0 && $state.current.name == 'app.teamfeeds'){
		   //  feeds.toast('No Record Found.', 'success');
		   //}
		  }
		);
              $ionicLoading.hide();
        console.log("hittt"); 
    }, 1000);
       
    }
})

//Teams Info
.controller('teamInfoCtrl', function($q, $scope, $state, $stateParams, $http, $rootScope,$ionicLoading, $ionicHistory, feeds) { 
    //console.log("well"); console.log($scope);
    $scope.obj = {};
    
    $scope.team_id =  $stateParams.team_id;
    $ionicLoading.show();
    $scope.$on('$ionicView.afterEnter', function(){
    TeamsListing();
    });
    
    $scope.searchNewsText = true;
       
        // Search Box show hide
		$scope.searchMe = function() {
		  $scope.obj.searchText = '';
          //Keyboard.close();
		  if($scope.searchNewsText == true){
		    $scope.searchNewsText = false;  
		  } else {
		      $scope.searchNewsText = true;
		  }
			
		};
        
    $scope.goHome =function(){
         feeds.nav($state, $ionicHistory);
    }
    
    // OnClick on add team..
    $scope.addTeam =function(team_id){
         AddRemoveTeam('1', team_id);
    }

// OnClick on remove team..
    $scope.removeTeam =function(team_id){
         AddRemoveTeam('0', team_id);
    }

// Add or Remove Team..
    function AddRemoveTeam(type,team_id){  //console.log("type="+type); console.log(team_id);
        
        feeds.addRemoveTeam($rootScope.globals.currentUser.id, type, team_id.id).then(
		function( response ) {
		   TeamsListing();
           feeds.toast(response.message, 'success');
        });
    }
    
    // OnClick on show detail team feeds..
    $scope.infoTeamFeeds =function(team_info){
         $state.go("app.teamfeeds", { "team_id": $scope.team_id, "teams_id": team_info.id, "team_name":team_info.name, "team_logo": team_info.team_logo}); 
    }
    
    // List of my team..
    function TeamsListing(){
        $ionicLoading.show();
        var team_id = $scope.team_id - 1;
        $scope.teamInfo = $rootScope.teams[team_id].Team; console.log($scope.teamInfo);
        $ionicLoading.hide();
       if(!$rootScope.teams[team_id] && $state.current.name == 'app.teamsinfo'){
	    	feeds.toast('No Record Found.', 'success');
	   }
    }
})

.controller('teamsCtrl', function($scope, $state,$ionicHistory, $rootScope, $ionicLoading, feeds) {

//OnState Change..
   $scope.$on('$ionicView.afterEnter', function(){
        $ionicLoading.show();
        TeamsListing();
    });
    

    $scope.goHome =function(){
         feeds.nav($state, $ionicHistory);
    }
// OnClick on show details team..
    $scope.infoTeam =function(team_id){
         $state.go("app.teamsinfo", { "team_id": team_id}); 
    }
    
// OnClick on add team..
    $scope.addTeam =function(team_id){
         AddRemoveTeam('add', team_id);
         TeamsListing();
    }

// OnClick on remove team..
    $scope.removeTeam =function(team_id){
         AddRemoveTeam('remove', team_id);
         TeamsListing();
    }

// Add or Remove Team..
    function AddRemoveTeam(type,team_id){
        feeds.addRemoveTeam($rootScope.globals.currentUser.id, type, team_id).then(
		function( response ) {
		   $ionicLoading.hide();
		   feeds.toast('Your team deleted successfully.', 'success');
           return;
        });
    }

// List of my team..
    function TeamsListing(){ //console.log(League.all());
        feeds.teams().then(
		  function( response ) {
				//$scope.teams = response.leagues;
                $rootScope.teams = response.leagues;
                $ionicLoading.hide();
            }
		);
    }
})

.controller('myteamCtrl', function($scope, $state, $rootScope, $ionicLoading, feeds) {
//console.log("delll");console.log($scope.myteams);
//OnState Change..
  // $scope.$on('$ionicView.afterEnter', function(){
        $ionicLoading.show();
       // console.log("ppppp"); console.log($scope.myteams);
        MyTeamListing();
        //console.log("ttttt");
   // });

// OnClick on add team..
    $scope.addTeam =function(team_id){
         AddRemoveTeam('1', team_id);
    }

// OnClick on remove team..
    $scope.removeTeam =function(team_id){
         AddRemoveTeam('0', team_id);
    }
    
// OnClick on show detail team feeds..
    $scope.infoTeamFeeds =function(team_info){
         $state.go("app.teamfeeds", { "team_id": team_info.team_id, "teams_id": team_info.id, "team_name":team_info.team_name, "team_logo": team_info.team_logo}); 
    }

// Add or Remove Team..
    function AddRemoveTeam(type,team_id){ //console.log("mmm");
        feeds.addRemoveTeam($rootScope.globals.currentUser.id, type, team_id).then(
		function( response ) {
           
           MyTeamListing();
           feeds.toast(response.message, 'success');
		   return;
        });
    }

// List of my team..
    function MyTeamListing(){ //console.log("eeeeeeei"); console.log($scope.myteams);
        feeds.myteams($rootScope.globals.currentUser.id).then(
		function( response ) {
    		$scope.myteams = response.teams;  //console.log("hiii"); console.log($scope.myteams.length);
            $ionicLoading.hide();
           if(response.teams.length == 0 && $state.current.name == 'app.myteam'){
    		  feeds.toast('No Record Found.', 'success');
    		}
			}
		);
    }
})

.controller('profileCtrl', function($scope, $state, $rootScope, $ionicHistory, $ionicActionSheet, $timeout, $ionicLoading, constants, feeds) {
    
    $scope.nick_name = $rootScope.globals.currentUser.nick_name;
    $scope.email = $rootScope.globals.currentUser.email;
    $scope.about_me = $rootScope.globals.currentUser.about_me;
    $scope.user_image = $rootScope.globals.currentUser.user_image;
    
    // Calling this function on click of send button..
    $scope.UpdateProfileBtn = function(){
        
         var name = $scope.name;
         var nick_name = $scope.nick_name;
         var email = $scope.email;
         var about_me = $scope.about_me;
         var myimage = $scope.myimage;
         
         
         if(!name){
            feeds.toast('Please Enter Your Name', 'error');
            return;
         }
         
         if(!email){
           feeds.toast('Please Enter Your Email', 'error');
           return;
         }
         
         if(email){
             var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
             if(!re.test(email)){
               feeds.toast('Please Enter Your Valid Email', 'error');
               return;
             }

         }
         
          if (name && email) {
              $ionicLoading.show();
              
              //set upload options
                $scope.photo = [];
                $scope.photo['fileKey'] = "file";
                $scope.photo['fileName'] = myimage;
                $scope.photo['mimeType'] = "image/jpeg";
                
                var user = {};
                user.name = name;
                user.nick_name = nick_name;
                user.email = email;
                user.about_me = about_me;
                user.user_image = myimage;
               
              feeds.UpdateProfile(name, nick_name, email, about_me, $scope.photo).then(function( response ) {
                var data = {};
                data.user = user;
                
               // var ft = new FileTransfer();
                //ft.upload(myimage, encodeURI(constants.apiUrl+"services/userAddRemoveTeam/"), win, fail, $scope.photo);
        
                  feeds.globalUserInfo(data, $rootScope);
                  feeds.toast('Profile Updated Successfully.', 'success');
              });
              
              $ionicLoading.hide();
              return;
           }
     }
     
    $scope.uploadImage = function(){
        // Triggered on a button click, or some other target
        
           // Show the action sheet
           var hideSheet = $ionicActionSheet.show({
             buttons: [
               { text: 'Capture Photo' },
               { text: 'Capture Editable Photo' },
               { text: 'From Photo Library' },
               { text: 'From Photo Album' },
             ],
             titleText: 'Choose your option',
             cancelText: 'Cancel',
             cancel: function() {
                  // add cancel code..
                },
             buttonClicked: function(index) {
             
                 switch (index){
    			     case 0 :
                        feeds.capturePhoto();
                        return true;
                    case 1:
                        feeds.capturePhotoEdit();
                        return true;
                    case 2:
                        feeds.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
                        return true;
                    case 3:
                        feeds.getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM);
                        return true;
                }
             }
           });
        
           // For example's sake, hide the sheet after two seconds
           $timeout(function() {
             hideSheet();
           }, 8000);
        

        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value 
    
        // Wait for Cordova to connect with the device
        //
        document.addEventListener("deviceready",onDeviceReady,false);
    }
    
    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
})

.controller('menuCtrl', function($scope, $state, $rootScope, $ionicHistory) {
    $scope.navBtn =function(nav) {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go(nav);  
    }
    
    // LogOut function to logout user session..    
    $scope.LogOut = function () {
        $rootScope.globals = {};
        $rootScope.globals = {
            currentUser: {}
        };
        
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $state.go('page1');
    };

})

.controller('homeCtrl', function($scope, $state, $ionicHistory, $rootScope, $ionicLoading, feeds) {
        
        
       // $scope.$on('$stateChangeSuccess', function() {
            //feeds.checkConnection();
       // })
        
        $scope.guestBtn =function() {
            feeds.nav($state, $ionicHistory);
        }
        
        $scope.signupBtn =function() {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.page3');
        }
        
        $scope.loginBtn =function() {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.page2');  
        }
})

// Left side navigation menu.html page controller..
.controller('AppCtrl', function($scope, $state, $ionicHistory, $rootScope) {
    
    
})

//Controller for information page..
.controller('infoCtrl', function($scope, $state, $ionicHistory, feeds) {
    $scope.goHome =function(){
         feeds.nav($state, $ionicHistory);
    }
})


//Contact Us page controller..
.controller('contCtrl', function($scope,$state, $http, $ionicLoading, $ionicHistory, feeds) {
    // Calling this function on click of send button..
    $scope.PostContact = function(){

         var name = $scope.name;
         var email = $scope.email;
         var message = $scope.message;
         
         if(!name){
            feeds.toast('Please Enter Your Name', 'error');
            return;
         }
         
         if(!email){
           feeds.toast('Please Enter Your Email', 'error');
           return;
         }
         
         if(email){
             var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
             if(!re.test(email)){
               feeds.toast('Please Enter Your Valid Email', 'error');
               return;
             }

         }
         
         if(!message){
            feeds.toast('Please Enter Your Message', 'error');
            return;
         }

         
          if (name && email) {
              $ionicLoading.show();
              
              feeds.contactQuery(name, email, message).then(function( response ) {
                  feeds.toast('Contact Saved Successfully.', 'success');
                  emptyFields();
              });
              
              $ionicLoading.hide();
           }
           
            
         
         function emptyFields(){
            $scope.name ='';
            $scope.email = '';
            $scope.message = '';
         }
     }
     
     $scope.goHome =function(){
            feeds.nav($state, $ionicHistory);
        }
})


.controller('validateCtrl', [ '$q', '$scope', '$state', '$ionicHistory','$http', '$rootScope', '$ionicLoading','feeds', function($q, $scope, $state,$ionicHistory, $http, $rootScope, $ionicLoading, feeds) {
    $rootScope.globals = {};
    
    $rootScope.globals = {
        currentUser: {}  
    };
    
    //Browse as guest user btn click
        $scope.guestBtn =function() {
            feeds.nav($state, $ionicHistory);
        }
        
        $scope.signupBtn =function() {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.page3');
        }
        
        // function calling when click on Login button..
		$scope.loginBtn =function() {
			
            var email = $scope.loginemail;
			var password = $scope.loginpassword;
			
            if(!email){
                feeds.toast('Please Enter Email', 'error');
                return;
            }
            
            if(email){
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if(!re.test(email)){
                   feeds.toast('Please Enter Valid Email', 'error');
                    return;
                }
            }
    
            if(!password){
                feeds.toast('Please Enter Password', 'error');
                return;
            }
            
			if(email && password){
                
                $ionicLoading.show();
                                                                            
                 feeds.loginUser(email, password).success(function (response) { //console.log(response);
                    if(response.error == 1){
                        feeds.toast(response.message, 'error');
                        $ionicLoading.hide();
                        return;
                    }
					feeds.globalUserInfo(response, $rootScope);
                    feeds.nav($state, $ionicHistory);
                    $ionicLoading.hide();
                }).error(function (response) {
                    
                });
			}
		}
    }])

	// Sign Up controller 
	.controller('signupCtrl', [ '$q', '$scope', '$state', '$http', '$rootScope', '$ionicHistory', '$ionicLoading', 'feeds', '$ionicActionSheet', '$timeout', function($q, $scope, $state, $http, $rootScope, $ionicHistory, $ionicLoading, feeds, $ionicActionSheet, $timeout) {
        
        $scope.loginBtn =function() {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.page2');  
        }
        
        //Browse as guest user btn click
        $scope.guestBtn =function() {
            feeds.nav($state, $ionicHistory);
        }
         
        //Call this function on click on sign up button..
		$scope.signupBtn =function() {
		  
			var firstname = $scope.fname;
			var lastname = $scope.lname;
			var email = $scope.email;
			var password = $scope.password;
			var cpassword = $scope.cpassword;
            var myimage = $scope.myimage;
            
            if(!myimage){
                feeds.toast('Please Upload a Image', 'error');
                return;
            }
            
            if(!firstname){
                feeds.toast('Please Enter First Name', 'error');
                return;
            }
            if(!lastname){
                feeds.toast('Please Enter Last Name', 'error');
                return;
            }

            if(!email){
                feeds.toast('Please Enter Email', 'error');
                return;
            }

            if(email){
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if(!re.test(email)){
                    feeds.toast('Please Enter Valid Email', 'error');
                    return;
                }
            }

            if(!password){
                feeds.toast('Please Enter Password', 'error');
                return;
            }

            if(!cpassword){
                feeds.toast('Please Enter Confirm Password', 'error');
                return;
            }

            if(cpassword!=password){
                feeds.toast('Both Password did not match', 'error');
                return;
            }

				$ionicLoading.show();
                
                 feeds.signUp(firstname, lastname, password, email, myimage).success(function (data) {
					feeds.globalUserInfo(data, $rootScope);
                    feeds.nav($state, $ionicHistory); 
                }).error(function (data) { 
                    feeds.toast('Error in Sign up', 'error');
                });
                 
                $ionicLoading.hide();
		}
        
        $scope.uploadImage = function(){
                // Triggered on a button click, or some other target
                
                   // Show the action sheet
                   var hideSheet = $ionicActionSheet.show({
                     buttons: [
                       { text: 'Capture Photo' },
                       { text: 'Capture Editable Photo' },
                       { text: 'From Photo Library' },
                       { text: 'From Photo Album' },
                     ],
                     titleText: 'Choose your option',
                     cancelText: 'Cancel',
                     cancel: function() {
                          // add cancel code..
                        },
                     buttonClicked: function(index) {
                     
                         switch (index){
            			     case 0 :
                                feeds.capturePhoto();
                                return true;
                            case 1:
                                feeds.capturePhotoEdit();
                                return true;
                            case 2:
                                feeds.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
                                return true;
                            case 3:
                                feeds.getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM);
                                return true;
                        }
                     }
                   });
                
                   // For example's sake, hide the sheet after two seconds
                   $timeout(function() {
                     hideSheet();
                   }, 8000);
                
        
         
         
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value 
            
                // Wait for Cordova to connect with the device
                //
                document.addEventListener("deviceready",onDeviceReady,false);
            }
            
            // Cordova is ready to be used!
            //
            function onDeviceReady() {
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
            }
    }])
	
    //News Feeds Controller//
	.controller('newsListing', function($q,$state, $scope, $ionicHistory,$ionicLoading, $timeout, feeds ) {
	   $scope.obj = {};
       $scope.feeds = [];
       $scope.noMoreItemsAvailable = true;
       $scope.searchNewsText = true;
       
       
        // Search Box show hide
		$scope.searchMe = function() {
		  $scope.obj.searchText = '';
		  if($scope.searchNewsText == true){
		    $scope.searchNewsText = false;  
		  } else {
		      $scope.searchNewsText = true;
		  }	
		};
        
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
          
		// Open link in mobile web browser..
		$scope.inAppBrowser = function(link) {
			var ref =window.open(link, '_blank', 'location=yes');
		};
        
       
        
        
        // Pull down function..  
        $scope.doRefresh = function() {
            loadRemoteData();
            $scope.$broadcast('scroll.refreshComplete');
        };
	  
		$scope.goComment =function(feed_id) {
            $state.go("app.comments", { "feedId": feed_id});
        }
		
 // I apply the remote data to the local scope.
		function applyRemoteData( response ) {
		  $scope.feeds = response.feeds;
		}
        
		$scope.likeUnlikeFeed =function(userId,flag,feedId) {
		    //$ionicLoading.show();
			feeds.likeUnlike(userId,flag,feedId).then( 
            
				function( response ) {
				        loadRemoteData();
					}
				).finally(function(){ $ionicLoading.hide();
				    if(flag == 1){
                        var ftxt = 'You like successfully.';
                    } else{
                        var ftxt = 'You Unlike successfully.';
                    }
                    
				    feeds.toast(ftxt, 'sucess');
				});	
		}
        
        $ionicLoading.show();
       $scope.$on('$ionicView.afterEnter', function(){
            console.log("afterEnter"); 
            
            loadRemoteData();
            $scope.noMoreItemsAvailable = false;
            $ionicLoading.hide();
       });
            
          
        $scope.loadMoreData=function(){
            $ionicLoading.show();
            feeds.allNews().then( 
				function( response ) {
				    applyRemoteData( response );
                    return;
                });
 
            if(!$scope.feeds.length > 0){
			 $scope.noMoreItemsAvailable = true;
            }
            
          $scope.$broadcast('scroll.infiniteScrollComplete');
          
          $ionicLoading.hide();
        }
        
		function loadRemoteData() {
		  
		      $ionicLoading.show();
              
			// The friendService returns a promise.
			feeds.allNews().then(
				function( response ) {
						applyRemoteData( response );
					}
				).finally(function() {
				   $ionicLoading.hide();
                   // Stop the ion-refresher from spinning
                  // $scope.$broadcast('scroll.refreshComplete');
                });
		}
	})
    
    //Comments Controller..
    .controller('commentsController', function($q, $scope, $state,$ionicHistory, $stateParams, $http, $rootScope,$ionicLoading, feeds) {
        
         $scope.id =  $stateParams.feedId;
         
           feedComments();
    $scope.goHome =function(){
         feeds.nav($state, $ionicHistory);
    }
       function feedComments(){
            //$ionicLoading.show();
            getComments($stateParams.feedId);
            //$ionicLoading.hide();
       }
         
        function getComments(feedId){
            
          $scope.comments = [];
		  
          $ionicLoading.show();
              
          feeds.getComments(feedId).then( 
			function( response ) {
					$scope.comments = response.comments.reverse();
                    $scope.count=response.comments.length;
                    if(response.comments.length == 0 && $state.current.name == 'app.comments'){
            		    	 feeds.toast('No Previous Comments Found.', 'success');
            		  }
                    $ionicLoading.hide();
				}
			);
            
           $ionicLoading.hide();
        }
        
        
        //Add comments
            $scope.AddComents=function(feedId)
            {   
                if(!$scope.comment){ 
                    feeds.toast('Please Enter Some text', 'error');
                    return;
                }
                $ionicLoading.show();
                feeds.addComments($rootScope.globals.currentUser.id, $scope.comment,feedId).success(function (data) {
					$scope.comment='';
        
                    //rebind the list
                    getComments(feedId);
                }).error(function (data) { 
                    feeds.toast('Error in save comments', 'error');
                });
            }
        
	})
    
    .filter('fromNow', function() {
      return function(date) {
        return moment(date).fromNow();
      }
    })