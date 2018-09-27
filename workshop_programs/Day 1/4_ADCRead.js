load("api_timer.js");
load("api_adc.js");

let A0 = 0;

// Timer Call Every Second
Timer.set(1000, true, function () {
	let voltage = ADC.read(A0);
	let sensorValue = voltage * (3.3 / 1023.0);
	print(sensorValue * 10);
}, null);