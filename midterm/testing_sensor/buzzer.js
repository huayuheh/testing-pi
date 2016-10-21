var Gpio = require('onoff').Gpio,
  buzzer = new Gpio(16, 'out'),


  buzzer.writeSync(1);

function exit() {
  buzzer.unexport();
  process.exit();
}
 
process.on('SIGINT', exit);