angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var showTime = new Date();

  var severIPAddress = "http://10.0.1.35:8080";
  $scope.captureNote = "No motion";
  $scope.captureTime = showTime;
  $scope.captureImage = severIPAddress + "/assets/img/logo-color-s.jpg";

  socket.on('event:photo', function( photoTime ) {
    console.log("receive data "+ photoTime);
    setTimeout(function(){
      $scope.$apply( function() {
        $scope.captureNote = "Detacted a motion";
        showTime = new Date(photoTime);
        $scope.captureTime = showTime;

        $scope.captureImage = severIPAddress + "/assets/img/" + photoTime + ".jpg";

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

    localStorage.setItem("time", showTime);
    console.log(localStorage.getItem("time"));
    document.getElementById("savedtime").innerHTML = localStorage.getItem("lastname");

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
  //console.log(chats);
  //$scope.chats.push(",{}");
  console.log(localStorage.getItem("time"));
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
    lightcontroller: false
  };
  $scope.turnLight = function ( ) {

      socket.emit('event:light', true);

  }
});

