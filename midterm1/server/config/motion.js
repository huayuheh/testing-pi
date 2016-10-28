 var gpio = require('onoff').Gpio,
  RaspiCam = require('raspicam'),
  motion = new gpio(21, 'in', 'both'),
  buzzer = new gpio(16, 'out'),
  io = null;

var camera = new RaspiCam({mode: 'photo', output: Date.now()+'.jpg'});

motion.watch( function(err, val){
  if( err ) { console.log('Motion in 21 Error'); return; }
  if (val){
    console.log('motion sensor detact something');
    camera.start();
    var photoTime = Date.now();
    camera.set('output', photoTime + '.jpg');
    if( io ) {
      io.sockets.emit('event:photo', photoTime);
	console.log('send data to server');
    }

  }
});
 if( io ) {
   io.socket.on('event:buzzer', function () {
     buzzer.writeSync(1);
     console.log("turn on buzzer ");
     setTimeout(function () {
       buzzer.writeSync(0);
     }, 3000);
   });

   io.socket.on('event:video', function () {
     console.log("record a video");

   });
 }

process.on('SIGINT', function(){
  motion.unexport();
  buzzer.unexport();
  process.exit();
});

module.exports = function( ioInstance ) {
  io = ioInstance;
}
