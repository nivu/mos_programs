load('api_adc.js');
load('api_rpc.js');
load('api_gpio.js');

let D0 = 16; // Button or PIR
GPIO.set_mode(D0, GPIO.MODE_INPUT); // Config D6 as Input Pin


let D2 = 4; // Heart
let D3 = 0; // Temp
GPIO.set_mode(D2, GPIO.MODE_INPUT);
GPIO.set_mode(D3, GPIO.MODE_INPUT);
GPIO.set_pull(D2, GPIO.PULL_DOWN);
GPIO.set_pull(D3, GPIO.PULL_DOWN);

RPC.addHandler('read', function(args) {
    let pir = GPIO.read(D0);
    print(GPIO.read(D2));
    let heart = GPIO.read(D2) ? ADC.read(0) : 0;
    print(GPIO.read(D3));
    let temp = GPIO.read(D3) ? (ADC.read(0)/1024) * 33 : 0;
    
    print('Heart : ', heart, ' Temp : ' ,temp, ' PIR : ', pir);
  
    return JSON.stringify(
              {
                'temperature': temp,
                'heart':heart,
                'pir': pir
              });
});



