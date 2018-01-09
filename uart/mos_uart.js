load('api_timer.js');
load('api_uart.js');
load('api_sys.js');


let uartNo = 1;   // Uart number used for this example
let rxAcc = '';   // Accumulated Rx data, will be echoed back to Tx

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
    print('Received UART data:', data);
    rxAcc += data;
  }
}, null);

// Enable Rx
UART.setRxEnabled(uartNo, true);
