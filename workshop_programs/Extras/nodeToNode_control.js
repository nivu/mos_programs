
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

let d4 = 2; // GPIO2 : D6

let node='n1';
let pub_topic = 'data/'+node;

//Built-in LED
GPIO.set_mode(d4, GPIO.MODE_INPUT);

Timer.set(1000,true,function(){
  
 let value= GPIO.read(d4);
 let   ok = MQTT.pub(pub_topic,JSON.stringify(
  {'status':value,
  'pin': 'd4',
  'node': node
  }),1);
  print(ok,"published");
  if(value){
      
  MQTT.pub("control/n1","1",1);
  } else {
      
  MQTT.pub("control/n1","0",1);
  }

},null);

