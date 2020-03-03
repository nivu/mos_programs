load('api_gpio.js');
load('api_mqtt.js');

let D7 = 13; // BUTTON or PIR Sensor
GPIO.set_mode(D7, GPIO.MODE_INPUT); // Config D7 as Input Pin

// MQTT Configuration
let node = 'n1';
let pub_topic = 'kt-data/' + node;

// Button Handler
GPIO.set_button_handler(D7, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function (x) {
  print('Button press, pin: ', x);
  let ok = MQTT.pub(pub_topic, JSON.stringify({
    'value': GPIO.read(D7),
    'pin': 'D7',
    'node': node
  }), 1);
  print(ok, " published");
}, null);