load('api_gpio.js');
load('api_mqtt.js');
load("api_timer.js");

let D6 = 12; // Button or PIR
GPIO.set_mode(D6, GPIO.MODE_INPUT); // Config D6 as Input Pin

// MQTT Configuration
let node = 'n1';
let pub_topic = 'data/' + node;

Timer.set(5000, true, function () {
  let value = GPIO.read(D6);
  print('Button Value D6 : ', value);

  let ok = MQTT.pub(pub_topic, JSON.stringify({
    'value': value,
    'pin': 'D6',
    'node': node
  }), 1);

  print(ok, " published");
}, null);