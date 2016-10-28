 var gpio = require('onoff').Gpio,
  motion = new gpio(21, 'in', 'both'),
  buzzer = new gpio(16, 'out'),
  io = null;

motion.watch( function(err, val){
  if( err ) { console.log('Motion in 21 Error'); return; }
  if (val){
    console.log('motion sensor detact something');
    camera.start();
    var photoTime = Date.now();
    camera.set('output', photoTime + '.jpg');
    if( io ) {
      io.sockets.emit('event:photo', photoTime);
    }

  }
});

socket.on('event:buzzer', function(){
  buzzer.writeSync( 1 );
  console.log("turn on buzzer light");
  setTimeout(function(){ buzzer.writeSync( 0 ); }, 3000);
});

socket.on('event:video', function(){
  console.log("record a video");

});


process.on('SIGINT', function(){
  motion.unexport();
  buzzer.unexport();
  process.exit();
});

module.exports = function( ioInstance ) {
  io = ioInstance;
}
