load('api_gpio.js');
load('api_timer.js');

let D0 = 16;
let D1 = 5;
let D2 = 4;
let D3 = 0;
let D4 = 2;

GPIO.set_mode(D0, GPIO.MODE_OUTPUT);
GPIO.set_mode(D1, GPIO.MODE_OUTPUT);
GPIO.set_mode(D2, GPIO.MODE_OUTPUT);

let led = "red";

Timer.set(1000, true, function() {
    if(led === "red"){
        GPIO.write(D0,1);
        GPIO.write(D1,0);
        GPIO.write(D2,0);
        led = "green";
    } else if(led === "green"){
        GPIO.write(D1,1);
        GPIO.write(D0,0);
        GPIO.write(D2,0);
        led = "blue";
    } else if(led === "blue"){
        GPIO.write(D2,1);
        GPIO.write(D0,0);
        GPIO.write(D1,0);
        led = "red";
    }

}, null);