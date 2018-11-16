load("api_adc.js");
load("api_timer.js");

Timer.set(
    2000, true,
    function () {
        let voltage = ADC.read(0);
        let sensorValue = voltage * (3.3 / 1023.0) * 100;
        print("sensorValue ", sensorValue);
    },
    null
);