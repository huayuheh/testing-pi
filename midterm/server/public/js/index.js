var socket = io();

socket.on('event:hello', function(){
  console.log('Hello from server through socket');
});

angular.module('mahrio-motion-client', [])
  .controller('MainCtrl', ['$scope', function( $scope ) {
    $scope.motion = false;
    socket.on('event:motion', function( val ) {
      console.log('Motion in 21 is ' +(val ? 'ACTIVE' : 'INACTIVE'));
      $scope.$apply( function() {
        $scope.motion = val ? true : false;
      });
    });
  }]);
