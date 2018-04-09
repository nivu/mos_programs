load('api_adc.js');
load('api_rpc.js');
load('api_gpio.js');
load('api_timer.js');

let D3 = 0; // Button or PIR
GPIO.set_mode(D3, GPIO.MODE_INPUT); // Config D6 as Input Pin

let D0 = 16; // S0
let D1 = 5; // S1
let D2 = 4; // S2

GPIO.set_mode(D0, GPIO.MODE_OUTPUT);
GPIO.set_mode(D1, GPIO.MODE_OUTPUT);
GPIO.set_mode(D2, GPIO.MODE_OUTPUT);

let alpha=0.75;
let period=20;
let refresh=0.0;
let oldValue=0;
let oldrefresh=0;
GPIO.write(D0,0);GPIO.write(D1,0);GPIO.write(D2,0);

RPC.addHandler('read', function(args) {
    let pir = GPIO.read(D3);
       
    GPIO.write(D0,0);GPIO.write(D1,0);GPIO.write(D2,0);
    let temp = (ADC.read(0)/1024) * 330;
    GPIO.write(D0,1);GPIO.write(D1,0);GPIO.write(D2,0);
    let beat = ADC.read(0);
    let value=alpha*oldValue+(0-alpha)*beat;
    refresh=value-oldValue;
    let heart = beat/10;
    oldValue=value;
    oldrefresh=refresh;

    print('Heart : ', heart, ' Temp : ' ,temp, ' PIR : ', pir);
  
    return JSON.stringify(
              {
                'temperature': temp,
                'heart':heart,
                'pir': pir
              });
});




