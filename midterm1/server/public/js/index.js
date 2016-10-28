var socket = io();

socket.on('event:hello', function(){
  console.log('Hello from server through socket');
});

var app = angular.module('feeder', [ ]);
  app.controller('CamaraController', function($scope){
      $scope.captureNote = "No motion";
      $scope.captureTime = 0;
      $scope.captureImage = "00.jpg";
    socket.on('event:photo', function( photoTime ) {
      console.log("receive data "+ photoTime);
      $scope.$apply( function() {
          $scope.captureNote = "Detacted a motion";
          $scope.captureTime = photoTime;
          $scope.captureImage = photoTime + ".jpg";
      });
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


    });


