load('api_adc.js');
load('api_mqtt.js');
load('api_timer.js');

// MQTT Configuration
let node = 'n1';
let pub_topic = 'data/' + node;

Timer.set(5000, true, function () {
  let value = ADC.read(0);
  print('Analog Value : ', value);

  let ok = MQTT.pub(pub_topic, JSON.stringify({
    'value': value,
    'pin': 'A0',
    'node': node
  }), 1);

  print(ok, " published");
}, null);