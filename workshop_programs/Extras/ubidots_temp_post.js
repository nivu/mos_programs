load('api_adc.js');
load("api_timer.js");
load("api_http.js");


Timer.set(2000, true, function() {
  let voltage = ADC.read(0);
	let sensorValue = voltage * (3.3 / 1023.0) *100;
	print('sensorValue ', sensorValue);
  
  HTTP.query({
    url: 'http://things.ubidots.com/api/v1.6/devices/test-node/?token=EJSMM2JkXwniZSZMzH5LlOIaZu9JbO',
    headers: { 'Content-Type': 'application/json' },     // Optional - headers
    data: {temp: sensorValue},   
    success: function(body, full_http_msg) 
    { 
      print(body); 
    },
    error: function(err) { 
      print(err); 
    },
  });
}, null)



