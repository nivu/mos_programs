load("api_timer.js");
load('api_gpio.js');

let D0 = 16;
let D1 = 5;
let D2 = 4;
let D3 = 0;
let D4 = 2;

GPIO.set_mode(D0, GPIO.MODE_INPUT);
GPIO.set_mode(D1, GPIO.MODE_INPUT); 
GPIO.set_mode(D2, GPIO.MODE_OUTPUT);
GPIO.set_mode(D3, GPIO.MODE_OUTPUT);
GPIO.set_mode(D4, GPIO.MODE_OUTPUT);

// Timer Call Every Second
Timer.set(1000, true, function() {
	let A = GPIO.read(D0);
	let B =  GPIO.read(D1);
	
	print(A, " " , B);

	if(A === 0 && B === 0){
		print("Do Nothing");
	} else if(A === 0 && B === 1){
		print("Red");
	}else if(A === 1 && B === 0){
		print("Blue");
	}else if(A === 1 && B === 1){
		print("Green");
	}
}, null);



