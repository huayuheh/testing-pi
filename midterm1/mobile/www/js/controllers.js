angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var showTime = new Date();
<<<<<<< HEAD
  $scope.captureNote = "No motion";
  $scope.captureTime = showTime;
  $scope.captureImage = "/assets/img/logo-color-s.jpg";
=======
  var severIPAddress = "http://192.168.2.2:8080";
  $scope.captureNote = "No motion";
  $scope.captureTime = showTime;
  $scope.captureImage = severIPAddress + "/assets/img/logo-color-s.jpg";
>>>>>>> a3caff2bdb25990061349dfeab5458c3f2cea3d8
  socket.on('event:photo', function( photoTime ) {
    console.log("receive data "+ photoTime);
    setTimeout(function(){
      $scope.$apply( function() {
        $scope.captureNote = "Detacted a motion";
        showTime = new Date(photoTime);
        $scope.captureTime = showTime;
<<<<<<< HEAD
        $scope.captureImage ="/assets/img/" + photoTime + ".jpg";
=======
        $scope.captureImage = severIPAddress + "/assets/img/" + photoTime + ".jpg";
>>>>>>> a3caff2bdb25990061349dfeab5458c3f2cea3d8
      });
    },500);
  });
  $scope.buzzer = function(){
    console.log("Buzzer");
    socket.emit('event:buzzer', true);
  };
  $scope.video = function(){
    console.log("video");
    socket.emit('event:video', true);
  };
  $scope.identify = function(){
    console.log("identify");
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
