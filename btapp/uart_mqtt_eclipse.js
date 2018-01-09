load('api_gpio.js');
load("api_rpc.js");
load('api_uart.js');
load('api_mqtt.js');

let d4 = 2; // GPIO2 : D4 // Built-in LED 
GPIO.set_mode(d4, GPIO.MODE_OUTPUT); // Config D4 as Output Pin

//let fileData = File.read('index.html');
let uartNo = 0;   // Uart number used for this example

// Configure UART at 115200 baud
UART.setConfig(uartNo, {
  baudRate: 9600,
  esp8266: {
    gpio: {
      rx:3,
      tx: 1,
    },
  },
});

MQTT.sub('nicu/rx', function(conn, topic, msg) {
  MQTT.pub('nicu', "req", 1);
}, null);

UART.setDispatcher(uartNo, function(uartNo) {
  let ra = UART.read(uartNo);
  if (ra.length > 0) {
    MQTT.pub('data', JSON.stringify({'ra': ra}), 1);
  }
}, null);

UART.setRxEnabled(uartNo, true);