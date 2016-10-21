var Gpio = require('onoff').Gpio,
  motion = new Gpio(21, 'in', 'both');
  buzzer = new Gpio(16, 'out'),
  buzzerState = 0;

  buzzer.writeSync(0);

  motion.watch( function(err, val){
  console.log(val);
  if( err ) { console.log('Motion in 21 Error'); return; }
  
  buzzer.writeSync(val);
});

function exit() {
  buzzer.unexport();
  motion.unexport();
  process.exit();
}
 
process.on('SIGINT', exit);