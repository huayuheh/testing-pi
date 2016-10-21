# WNM499: Midterm
## Title: Birfeeder
### ![Logo](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-logo.jpg?token=APcrcs3DpBCOOEf_B82Jj9r5QfGoJECNks5YEvMywA%3D%3D)
### Problem
When I was a kid, my parents took me to woods and beaches watching wild birds during weekends. I enjoy using telescopes to observe colorful birds, the most beautiful and adorable creatures in the world. Unfortunately, bird watching costs a lot of time for waiting and traveling around for searching, so not many people can enjoy this joy. The bird feeder is an easy and straightforward way for people to watch birds and enjoy this activity. But the traditional bird feeder has some issues might decrease beginner’s enthusiasm such as other animal stealing seeds, long time waiting without any reward and missing visited birds during working hours.
### Solution
![function](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-function.jpeg?token=APcrcllzMZpD3Jr3HIidxweejTfdOOtTks5YEvL_wA%3D%3D)
Birfeeder can solve that problem for beginners and let them dive into bird world effortless because of the motion sensor, the camera, and buzzer. The motion sensor can detect the live creature near the feeder, and the camera will take a picture and send the picture to client’s phone, so the owner can see the photo then decide to expel squirrels and other rodents by buzzer or watch the birds in person. Even if the proprietor is not nearby, he can choose to record the video for later watching so that he will never miss up the moment that birds visit his birfeeder.
### High-level System Design
![Feeder to App](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-system1.jpeg?token=APcrcr0hGBVhSvvNCi5Y4BlLKgTeQkmBks5YEvNtwA%3D%3D)
For real birfeeder product, when the PIR sensor detects action, the system takes a picture and send the photo to the web server (Heroku or firebase) through the private network to public network. Then the web server sends the notification with the picture to user’s application through the public network using wifi or 4G so that user can receive the alarm outside of the home.
![App to Feeder](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-system2.jpeg?token=APcrcm3PWwQNPWXGN9tWSx1DS4O8TVDpks5YEvOSwA%3D%3D)
After user sees the picture, the user can decide to turn on the buzzer to expel the unwelcome animals or take a video of this bird. When the user presses the button, the application will send the signal back to the raspberry pi inside of birfeeder through the cloud server. Then the Raspberry Pi controls the buzzer or camera for the request.
Right now, I'm not sure about my coding ability to use Heroku service to build the online server, so for the prototype, I will try only use the private network for testing. If I have more time and ability, I will try to build the node server on Heroku.
### Prototype
![Prototype](https://raw.githubusercontent.com/JesusGuerrero/hana-iot/master/midterm/images/birfeeder-prototype.jpg?token=APcrcj5exRmu6f8ojoAWWUAjo8dOkCwlks5YEvNQwA%3D%3D)
The prototype above will consist of getting the system setup with camera, buzzer, motion sensor, and two LED light.
### Development
#### Provisioning
The RaspberryPi is a mini-computer which needs to be provisioned. Here are the steps:
- Using a personal laptop download NOOBS
- Extract the contents into a micro-sd card at least 8Gb
- Open recovery.cmdline and add silentinstall at the end
- Put micro-sd card into Pi, turn on, and wait 30 minutes
- With laptop connected to wireless internet, chose to share internet via ethernet port
- Connect your laptop computer's ethernet into the Pi's ethernet
- SSH into the Pi with your laptop's terminal. ssh pi@192.168.2.2 (if that doesn't work try arp -a to find the Pi's IP address)
- Using the terminal to control the Pi, download the remote desktop tool. sudo apt-get install tightvncserver
- Start VNCServer by typing vncserver. The first time you launch it will ask you to create a password.
- On your laptop, download VNC Viewer and use the following address to login. 192.168.2.2:1
- Using the Raspbian Desktop, open up the terminal, then install and configure the following:
	- git
	- node
	- vim

#### Integrating
The Raspberry Pi will be programmed as a web socket server. The server will run on it's assigned IP address when connected to the wireless router. The Pi will receive commands from a mobile client via web sockets. 
The Ionic mobile app will be connected to the same wireless router network as the Raspberry Pi. The mobile will use the Raspberry Pi's IP address to connect via web socket. The mobile app will control the camera and the buzzer.

#### Code Snippets
##### Motion Sensor
``` javascript
var gpio = require('onoff').Gpio
  , motion = new gpio(21, 'in', 'both');

motion.watch( function(err, val){
  if( err ) { console.log('Motion in 21 Error'); return; }

  console.log('Motion in 21 is ' + (val ? 'ACTIVE' : 'INACTIVE') +': ' + new Date().toLocaleString() );

});

process.on('SIGINT', function(){
  motion.unexport();
  process.exit();
});
```
Test the motion sensor connecting to the raspberry PI correctly. And when the sensor detects motion it sends the signal back to the pi. 
