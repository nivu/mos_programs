load('api_gpio.js');
load('api_mqtt.js');

let D4 = 2; // GPIO2 : D4 //Built-in LED
let D0 = 16; // GPIO16 : D0 //Relay


GPIO.set_mode(D4, GPIO.MODE_OUTPUT);
GPIO.set_mode(D0, GPIO.MODE_OUTPUT);

// MQTT Configuration
let node = 'n1';
let sub_topic = 'control/' + node;


MQTT.sub(sub_topic, function (conn, topic, msg) {
      print('Topic:', topic, 'message:', msg);

      if (msg === "1") {
            GPIO.write(D4, 1);
            GPIO.write(D0, 1);
      } else if (msg === "0") {
            GPIO.write(D4, 0);
            GPIO.write(D0, 0);
      }

}, null);