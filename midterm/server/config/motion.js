 var gpio = require('onoff').Gpio,
  motion = new gpio(21, 'in', 'both'),
  led = new gpio(27, 'out'),      //setup GPIO27 as output
  ledState = 0,      //internal variable to track LED state (1 = on, 0 = off)
  io = null;
  var isRec = false;
  var fs = require('fs');

motion.watch(function(err, value) {
  if (err) exit();

  console.log('Intruder detected..');
  if (value == 1 && !isRec) {
 
    console.log('capturing video.. ');
 
    isRec = true;
 
    var exec = require('child_process').exec;
    var video_path = './video' + Date.now() + '.jpg';
 
    var cmd = 'raspistill -o ' + video_path ;

    exec(cmd, function(error, stdout, stderr) {
      // output is in stdout
      console.log('Video Saved @ : ', video_path);
      //require('./mailer').sendEmail(video_path);

    io.on('connection', function(socket){
      fs.readFile( video_path, function(err, buf){
        // it's possible to embed binary data
        // within arbitrarily-complex objects
        socket.emit('image', { image: true, buffer: buf.toString('base64') });
        console.log('image file is initialized');
      });

      socket.on('chat message', function(msg){
          //接收從顧客端來的資料
          led.writeSync( 1 );
          //傳送顧客端來的資料 回顧客端
        console.log("turn on led light");
      });


    });
      isRec = false;
    });
 
  }
});





process.on('SIGINT', function(){
  motion.unexport();
  process.exit();
});

module.exports = function( ioInstance ) {
  io = ioInstance;
}




// if( io ) {
//     io.sockets.emit('event:motion', val);
//   }