load("api_timer.js");
load('api_gpio.js');

let D2 = 4;
GPIO.set_mode(D2, GPIO.MODE_INPUT); // Config D4 as Output Pin

GPIO.set_button_handler(D2, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function (x) {
  print('Button press, pin: ', x);
}, null);