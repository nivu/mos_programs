load('api_uart.js');
load('api_sys.js');
load('api_gpio.js');
load('api_timer.js');
load('api_http.js');
load('api_mqtt.js');

let D4 = 2; // GPIO2 : D4 // Built-in LED 
GPIO.set_mode(D4, GPIO.MODE_OUTPUT); // Config D4 as Output Pin

let uartNo = 0;   // Uart number used for this example

// Configure UART at 115200 baud
UART.setConfig(uartNo, {
  baudRate: 115200,
  esp8266: {
    gpio: {
      rx: 3,
      tx: 1,
    },
  },
});

// Set dispatcher callback, it will be called whenver new Rx data or space in
// the Tx buffer becomes available
UART.setDispatcher(uartNo, function(uartNo) {
  let ra = UART.readAvail(uartNo);
  if (ra > 0) {
    // Received new data: print it immediately to the console, and also
    // accumulate in the "rxAcc" variable which will be echoed back to UART later
    let data = UART.read(uartNo);
    GPIO.toggle(D4);
    MQTT.pub('data', 'data', 1);
  }
}, null);

// Enable Rx
UART.setRxEnabled(uartNo, true);

