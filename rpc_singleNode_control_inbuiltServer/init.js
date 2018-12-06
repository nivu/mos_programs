load('api_gpio.js');
load("api_rpc.js");
load("api_file.js");

let d0 = 16;
let d1 = 5;
let d2 = 4;
let d6 = 12;
let d7 = 13;
let d8 = 15;

let d4 = 2; // GPIO2 : D4 // Built-in LED 
GPIO.set_mode(d4, GPIO.MODE_OUTPUT); // Config D4 as Output Pin

GPIO.set_mode(d0, GPIO.MODE_OUTPUT);
GPIO.set_mode(d1, GPIO.MODE_OUTPUT);
GPIO.set_mode(d2, GPIO.MODE_OUTPUT);
GPIO.set_mode(d6, GPIO.MODE_OUTPUT);
GPIO.set_mode(d7, GPIO.MODE_OUTPUT);
GPIO.set_mode(d8, GPIO.MODE_OUTPUT);

let fileData = File.read('data.txt');
let pinArr = [16, 5, 4, 12, 13, 15];

for (let i = 0; i <= 5; i++) {
    if (fileData[i] === "1") {
        GPIO.write(pinArr[i], 1);
    } else {
        GPIO.write(pinArr[i], 0);
    }
    // print(pinArr[i],' ', fileData[i]);
}

RPC.addHandler('control', function (args) {
    let response = GPIO.write(args.pin, args.val);
    let state = "";
    for (let i = 0; i <= 5; i++) {
        if (GPIO.read(pinArr[i]) === 1) {
            state = state + "1";
        } else {
            state = state + "0";
        }
    }
    File.write(state, "data.txt");
    return response;
});