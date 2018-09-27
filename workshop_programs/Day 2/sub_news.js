load('api_mqtt.js');

let sub_topic = 'node';

MQTT.sub(sub_topic, function (conn, topic, msg) {
      print('Topic:', topic, 'message:', msg);

}, null);