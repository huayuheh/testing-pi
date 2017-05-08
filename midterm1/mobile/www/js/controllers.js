angular.module('starter.controllers', [])

  .controller('HomeCtrl', function($scope) {
    $scope.turnLight = function(){
      console.log("Light");
      socket.emit('event:light', true);
    };

    $scope.turnBuzzer = function(){
      console.log("Buzzer");
      socket.emit('event:buzzer', true);
    };


  })

  .controller('AlertCtrl', function($scope) {})

  .controller('DeviceCtrl', function($scope) {})

  .controller('RecordCtrl', function($scope) {})


  .controller('DictionaryDetailCtrl', function($scope, $stateParams, Re) {

  })

  .controller('DictionaryCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })
    .controller('DictionaryDetailCtrl', function($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
    })

  .controller('SettingCtrl', function($scope) {})

  .controller("AlertDetailCtrl", function($scope) {})





.controller('DashCtrl', function($scope) {
  var showTime = new Date();
  var photoTimeSave = showTime;
  var severIPAddress = "http://10.0.1.34:8080";
  $scope.captureNote = "No motion";
  $scope.captureTime = "";
  $scope.captureImage = severIPAddress + "/assets/img/logo-color-s.jpg";

  socket.on('event:photo', function( photoTime ) {
    photoTimeSave = photoTime;
    setTimeout(function(){
      $scope.$apply( function() {
        $scope.captureNote = "Detacted a motion";
        showTime = new Date(photoTime);
        $scope.captureTime = showTime;

        $scope.captureImage = severIPAddress + "/assets/img/" + photoTime + ".jpg";

      });
    },500);
  });


  $scope.identify = function(){
    console.log("save it" + photoTimeSave );
    $scope.chats = [];
    $scope.chats.unshift(
      {id: 4,
        name: 'checkadee',
        lastText: '2016-12-08 08:13:42',
        face: '/assets/img/' + photoTimeSave + '.jpg'});

  };
})
.controller('PhotoCtrl', function($scope) {
    var showTime = new Date();
    var severIPAddress = "http://10.0.1.34:8080";


    socket.on('event:takephoto', function( photoTime ) {
      console.log("receive data "+ photoTime);
      setTimeout(function(){
        $scope.$apply( function() {
          showTime = new Date(photoTime);
          $scope.captureTime = showTime;

          $scope.captureImage = severIPAddress + "/assets/img/photo/" + photoTime + ".jpg";

        });
      },500);
    });

    $scope.video = function(){
      console.log("video");
      socket.emit('event:video', true);
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

