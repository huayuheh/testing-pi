angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.captureNote = "No motion";
  $scope.captureTime = 0;
  $scope.captureImage = "00.jpg";
  socket.on('event:photo', function( photoTime ) {
    console.log("receive data "+ photoTime);
    setTimeout(function(){
      $scope.$apply( function() {
        $scope.captureNote = "Detacted a motion";
        $scope.captureTime = photoTime;
        $scope.captureImage ="/assets/img/" + photoTime + ".jpg";
      });
    },1000);
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
