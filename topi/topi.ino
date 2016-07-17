#include <SPI.h>
#include <Ethernet.h>

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };


char server[] = "www.explrr.com";    // name address for Google (using DNS)

// Set the static IP address to use if the DHCP fails to assign
IPAddress ip(192,168,0,177);

// Initialize the Ethernet client library
// with the IP address and port of the server 
// that you want to connect to (port 80 is default for HTTP):
EthernetClient client;

unsigned long lastConnectionTime = 0;             // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 1L * 1000L; // delay between updates, in milliseconds

String response;
String switchStatus;
bool lightStatus;

int pin = 3;

void setup() {
 // Open serial communications and wait for port to open:
  Serial.begin(9600);
   while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  // initialize digital pin 13 as an output.
  pinMode(pin, OUTPUT);

  Serial.println("Beggining initialization.");

  Serial.println(Ethernet.begin(mac));
  
  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }

  Serial.println("I think I'm done! Maybe?");
  
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("Setup complete.");
}


void httpRequest() {
  
  Serial.println("Sending a HTTP request.");
  
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();

  // if there's a successful connection:
  if (client.connect(server, 80)) {
    Serial.println("connected");
    // Make a HTTP request:
    client.println("GET /topi/status/index.php HTTP/1.1");
    client.println("Host: www.explrr.com");
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    lastConnectionTime = millis();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}

void loop()
{


while(client.connected() && !client.available()) delay(1); 
      while (client.available()) {
        char c = client.read();
        response= response + c;
      }
     int contentBodyIndex = response.lastIndexOf("\r\n");
     if (contentBodyIndex > 0) {
        //Serial.print(response.substring(contentBodyIndex + 1));
        switchStatus = response.substring(contentBodyIndex + 1);
     }

      client.stop();
      client.flush();

  // if ten seconds have passed since your last connection,
  // then connect again and send data:
  if (millis() - lastConnectionTime > postingInterval) {
    httpRequest();
  }


  if (switchStatus == "\n1") {
    Serial.println("On!");
    digitalWrite(pin, HIGH);
    lightStatus = true;
    //delay(100);
  }
  else if (switchStatus == "\n0") {
    Serial.println("Off!");
    digitalWrite(pin, LOW);
    lightStatus = false;
    //delay(100);
  }


 
}

