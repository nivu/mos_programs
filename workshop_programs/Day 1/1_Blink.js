load('api_gpio.js');
load('api_timer.js');

let D4 = 2; // GPIO2 : D4 // Built-in LED 
GPIO.set_mode(D4, GPIO.MODE_OUTPUT); // Config D4 as Output Pin

// Timer Call Every Second
Timer.set(1000, true, function () {
    let value = GPIO.toggle(D4);
    print(value ? 'Tick' : 'Tock');
}, null);