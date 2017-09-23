load("api_timer.js");
load('api_gpio.js');

let D2 = 4;
GPIO.set_mode(D2, GPIO.MODE_INPUT); // Config D4 as Output Pin

// Timer Call Every Second
Timer.set(1000, true, function() {
	let value = GPIO.read(D2);
  print(value ? 'Tick' : 'Tock');
}, null);



