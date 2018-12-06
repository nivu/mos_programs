#include "ThingSpeak.h"
#include <ESP8266WiFi.h>

//----------------  Fill in your credentails   ---------------------
char ssid[] = "MySSID";             // your network SSID (name) 
char pass[] = "MyPassword";         // your network password
unsigned long myChannelNumberForSensor1 = 0;  // Temperature Sensor
unsigned long myChannelNumberForSensor2 = 1;  // Humidity Sensor

const char * myWriteAPIKey = "7TBZJSZHIA65Q3T5";    // Paste your ThingSpeak Write API Key between the quotes 
//------------------------------------------------------------------

WiFiClient  client;

int number = 0;

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client); 
}

void loop() {

  // Connect or reconnect to WiFi
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(SECRET_SSID);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);
      Serial.print(".");
      delay(5000);     
    } 
    Serial.println("\nConnected.");
  }

  float tempVal = 30;
  float humVal = 50;
  
  // Write to ThingSpeak. There are up to 8 fields in a channel, allowing you to store up to 8 different
  // pieces of information in a channel.  Here, we write to field 1.
  int x = ThingSpeak.writeField(myChannelNumberForSensor1, tempVal, number, myWriteAPIKey);
  int y = ThingSpeak.writeField(myChannelNumberForSensor2, humVal, number, myWriteAPIKey);

  // Check the return code
  if(x == 200){
    Serial.println("Channel update successful.");
  }
  else{
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }

  number++;
  if(number > 99){
    number = 0;
  }
  
  delay(20000); // Wait 20 seconds before sending a new value
}
