angular.module('starter.services', []).directive('ddTextCollapse', ['$compile', function($compile) {

    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {

            scope.collapsed = false;

            scope.toggle = function() {
                scope.collapsed = !scope.collapsed;
            };

            attrs.$observe('ddTextCollapseText', function(text) {

                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

                if (text.length > maxLength) {
                    var firstPart = String(text).substring(0, maxLength);
                    var secondPart = String(text).substring(maxLength, text.length);

                     var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "Read Less" : "Read More"}}</span>')(scope);

                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);
                   // element.append(toggleButton);
                } else {
                    element.empty();
                    element.append(text);
                }
            });
        }
    };
}])

.service('feeds', function($q, $http, $ionicLoading, $rootScope, $ionicActionSheet, constants) {

                return({
                    allNews: allNews,
					likeUnlike: likeUnlike,
                    getComments: getComments,
                    addComments: addComments,
                    toast: toast,
                    contactQuery: contactQuery, 
                    loginUser: loginUser,
                    globalUserInfo: globalUserInfo,
                    signUp: signUp,
                    nav: nav,
                    myteams: myteams,
                    teams: teams,
                    addRemoveTeam: addRemoveTeam,
                    UpdateProfile: UpdateProfile,
                    teamnewsfeed: teamnewsfeed,
                    checkConnection: checkConnection,
                    capturePhoto:capturePhoto,
                    capturePhotoEdit:capturePhotoEdit,
                    getPhoto:getPhoto
                });
           
                function checkConnection() {  console.log("Check Connection");
                    var networkState = navigator.connection.type;
                
                    var states = {};
                    if(states[networkState] == states[Connection.NONE] ){
                        toast(states[networkState],'error');
                        $rootScope.globals = {};
                        $rootScope.globals = {
                            Internet: {
                                connection: false
                            }
                        };
                        console.log($rootScope);
                    }
                }
                
                function teamnewsfeed(team_id){ console.log("team feeds by team id");
                                
                    var request = $http.post(constants.apiUrl+"services/getFeedsByTeamId/", {'team_id' : team_id});
                    return( request.then( handleSuccess, handleError ) );
                }
                
                function UpdateProfile(name, nick_name, email, about_me, photo){ console.log("Update Profile");
                    $ionicLoading.show();
                    var request = $http.post(constants.apiUrl+"services/saveUserProfile/", {'name' : name,'nick_name':nick_name,'email':email,'about_me':about_me,'photo':photo});
                    return( request.then( handleSuccess, handleError ) );
                }
                
                function addRemoveTeam(user_id, type, team_id){ console.log("add remove team ");
                    $ionicLoading.show();
                    var request = $http.post(constants.apiUrl+"services/userAddRemoveTeam/", {'user_id' : user_id,'add':type,'team_id':team_id});
                    return( request.then( handleSuccess, handleError ) );
                }
                
                function myteams(userid){ console.log("my team ");
                    var request = $http.get(constants.apiUrl+"services/getUserTeams/"+userid);
                    return( request.then( handleSuccess, handleError ) );
                }
                
                function teams(){ console.log("get all leaguesq ");
                    var request = $http.get(constants.apiUrl+"services/getLeaguesWithTeams/");
                    return( request.then( handleSuccess, handleError ) );
                }
                
                function nav($state, $ionicHistory){  console.log("nav scroll");
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                    $state.go('app.news');  
                 }
                               
                function toast(msg, msg_type){ console.log("tost message");
                    $().toastmessage('showToast', {
                         text     : msg,
                         inEffectDuration:  500,
                         stayTime:         1000,
                         sticky   : false,
                         position:  'bottom-center',
                         type     : msg_type
                     });
                     return;
                }
                
                function globalUserInfo(data, $rootScope){ console.log("global user infomations");
                    
                    $rootScope.globals = {};
                    var user_image = '';
                    if(data.user.image){
                        user_image = data.user.image;
                    }

                    $rootScope.globals = {
                        currentUser: {
                            id: data.user.id,
                            name: data.user.name,
                            user_image: user_image,
                            about_me: data.user.about_me,
                            email: data.user.email,
                            nick_name: data.user.nick_name
                        }
                    };
                    return;
                }
                
                function contactQuery(name, email, message){ console.log("Contact query");
                    var request = $http.post(constants.apiUrl+'services/userContactUs', {'description': message, 'name': name, 'email': email});
                    
					return( request.then( handleSuccess, handleError ) );
                }
                
                function loginUser(email, password){  console.log("Login User");
                    var request = $http.post(constants.apiUrl+'services/loginUser/', {'email':email, 'password':password});
                    
					return request;
                }
                
                function signUp(firstname, lastname, password, email, myimage){  console.log("Sign Up User");
                    $timeout(function() {
                    var request = $http.post(constants.apiUrl+'services/registerUser/', {"name": firstname+' '+lastname,"password": password,"teamids": "","email": email,"myimage": myimage});
                    
					return request;
                    }, 3000);
                }
                
                
				
				function likeUnlike(userId,flag,feedId){ console.log("Like Unlike post..");
				    var request = $http.post(constants.apiUrl+'services/userLikeUnlikeFeed', {'user_id' : userId,'flag':flag,'feed_id':feedId});
                    
                    return( request.then( handleSuccess, handleError ) );
				}
                
                function getComments(feedId){ console.log("Get Comments");
					var request = $http.get(constants.apiUrl+"services/userCommentsList/"+feedId,{'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin': '*'});
                    
					return( request.then( handleSuccess, handleError ) );
				}
                
                function addComments(user_id, comment, feed_id){
					var request = $http.post(constants.apiUrl+'services/userAddComment/', {'user_id':user_id,'comment':comment,'feed_id':feed_id});
                    
					return request;
				}
				
				function allNews(){ console.log("Get All News");
	   			 	var request = $http.get(constants.apiUrl+'services/getAllFeeds');
                    
					return( request.then( handleSuccess, handleError ) );
                    return request;
                }
                
				function handleError( response ) {
                   if (
                        ! angular.isObject( response.data ) ||
                        ! response.data.message
                        ) { console.log("Check service handleError function. your services call return error");
                        return( $q.reject( "An unknown error occurred." ) );
                    }
                     return( $q.reject( response.data.message ) );
                }
                
                function handleSuccess( response ) {
                    return( response.data );
                }

                function onPhotoDataSuccess(imageURI) {
                  var profileImage = document.getElementById('profileImage');
            
                  profileImage.style.display = 'block';
            
                  profileImage.src = imageURI;
                }
                
                
                function onPhotoDataSuccessUrl(imageData) {
                 }
                
            
                function onPhotoURISuccess(imageURI) {
                   var profileImage = document.getElementById('profileImage');
            
                  profileImage.style.display = 'block';
            
                  profileImage.src = imageURI;
                }
            
                function capturePhoto() {
                  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100,
                    destinationType: destinationType.FILE_URI });
                  
                }
            
                function capturePhotoEdit() {
                  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100, allowEdit: true,
                    destinationType: destinationType.FILE_URI });
                }
            
                function getPhoto(source) {
                  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100,
                    destinationType: destinationType.FILE_URI,
                    sourceType: source });
                }
            
                function onFail(message) {
                }
});
