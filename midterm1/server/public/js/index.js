var socket = io();

socket.on('event:hello', function(){
  console.log('Hello from server through socket');
});

var app = angular.module('feeder', [ ]);
  app.controller('CamaraController', function($scope){

    socket.on('event:photo', function( photoTime ) {
      console.log(photoTime);
      $scope.notes = alarm;
        alarm.date = photoTime;
        alarm.image = photoTime + "jpg";
    });

            $scope.buzzer = function(){
                console.log("Buzzer");
                io.sockets.emit('event:buzzer', true);
            };
            $scope.video = function(){
                console.log("video");
                io.sockets.emit('event:video', true);
            };
            $scope.identify = function(){
                console.log("identify");
            };


    });

    var alarm =
        {
            date:Date.now(),
            text: "alert: something close to the feeder",
            image: 'Case.png'
        };




// angular.module('mahrio-motion-client', [])
//   .controller('MainCtrl', ['$scope', function( $scope ) {
//     $scope.motion = false;
//     socket.on('event:motion', function( val ) {
//       console.log('Motion in 21 is ' +(val ? 'ACTIVE' : 'INACTIVE'));
//       $scope.$apply( function() {
//         $scope.motion = val ? true : false;
//       });
//     });
//   }]);
