var accountSid = 'AC70731db98f0a7ad0863697704e8e4716';
var authToken = '281c19c81e4762364b53524f5bf7eadc';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

require('mahrio').runServer( process.env, __dirname)
  .then( function(server){
    console.log('running');

    client.messages.create({
      body: 'Server Running',
      to: '+14159990504',  // Text this number
      from: '+14159694541' // From a valid Twilio number
    }).then(function(message){ 
      console.log(message.sid)
      console.log('message sent');
    });
  });
