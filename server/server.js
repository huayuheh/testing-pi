//IOT sensors from raspberry pi
var gpio = require('onoff').Gpio,
    camera = require('./camera')(),
    cameraMode = camera.status().mode,
    led1 = new gpio(27, 'out'),
    led2 = new gpio(22, 'out'),
    buzzer = new gpio(12, 'out');

var ledState = 0;


// Twilio, the SMS system service
var accountSid = 'AC70731db98f0a7ad0863697704e8e4716';
var authToken = '281c19c81e4762364b53524f5bf7eadc';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


//ip address
process.env.NODE_URL='hana.local';

require('mahrio').runServer( process.env, __dirname ).then( function( server ) {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: ['../public/']
      }
    }
  });

    client.messages.create({
        body: 'Server Running',
        to: '+14159990504',  // Text this number
        from: '+14159694541' // From a valid Twilio number
    }).then(function(message){
        console.log(message.sid)
        console.log('message sent');
    });


  var io = require('socket.io').listen( server.listener );
  io.on('connection', function( socket ) {
    console.log('connection: ', socket.id );
    socket.emit('event:hello');

      //LED
      socket.on('event:light', function () {
          console.log("turn on light ");
          ledState = !ledState;
          led1.writeSync(ledState);
          led2.writeSync(ledState);
      });
      //Buzzer
      socket.on('event:buzzer', function () {
          buzzer.writeSync(1);
          console.log("turn on buzzer ");
          setTimeout(function () {
              buzzer.writeSync(0);
          }, 3000);
      });
      //Raspicam
      socket.on('event:camera:photo', function(){
        
          camera.setMode('photo', function(){
	    console.log('inside callback');
	    camera.start(); 
          });
        
      });
      socket.on('event:camera:video', function(){
        if( cameraMode !== 'video') {
          camera.setMode('video');
          cameraMode = 'video';
        }
        camera.start();
      });
      socket.on('event:camera:timelapse', function(){
        if( cameraMode !== 'timelapse') {
          camera.setMode('timelapse');
          cameraMode = 'timelapse';
        }
        camera.start();
      });
      socket.on('event:camera:live', function(){
	console.log('going live');
        camera.setMode('live');
      });
  
    //BEGIN LISTENING FOR SOCKET MESSAGES FROM CLIENTS
    //Example:
    //socket.on('myCustomMessage', function( val ){ console.log( val ); });

  });
  camera.setSocket( io );

  var state = false;
  setInterval( function(){
    io.sockets.emit('event:led:state', state = !state );
  }, 1000);

  console.log('Server Ready');
});
