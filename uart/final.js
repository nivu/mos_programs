load('api_gpio.js');
load("api_rpc.js");
load("api_file.js");
load('api_uart.js');

let d4 = 2; // GPIO2 : D4 // Built-in LED 
GPIO.set_mode(d4, GPIO.MODE_OUTPUT); // Config D4 as Output Pin

let fileData = File.read('index.html');
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

RPC.addHandler('control', function(args) {
  //let response = GPIO.write(args.pin, args.val);
  let state = UART.write(0, args.val);

  File.write("state", "index.html");
  return true;
});
