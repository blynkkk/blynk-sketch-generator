'use strict';

const shields = {
  /***********************************************************/
  "--- Ethernet" : {},
  /***********************************************************/
  "Ethernet Shield W5100" : {
    name: "Arduino Ethernet Shield",
    inc: `
#include <SPI.h>
#include <Ethernet.h>
#include <BlynkSimpleEthernet.h>
    `,
    glob : `
#define W5100_CS  10
#define SDCARD_CS 4
    `,
    init: `
  pinMode(SDCARD_CS, OUTPUT);
  digitalWrite(SDCARD_CS, HIGH); // Deselect the SD card

  Blynk.begin(auth);
  // You can also specify server:
  //Blynk.begin(auth, "blynk-cloud.com", 80);
  //Blynk.begin(auth, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "Ethernet Shield W5200" : {
    name: "Seeed Ethernet Shield V2.0",
    inc: `
#include <SPI.h>
#include <EthernetV2_0.h>
#include <BlynkSimpleEthernetV2_0.h>
    `,
    glob : `
#define W5200_CS  10
#define SDCARD_CS 4
    `,
    init: `
  pinMode(SDCARD_CS, OUTPUT);
  digitalWrite(SDCARD_CS, HIGH); // Deselect the SD card

  Blynk.begin(auth);
  // You can also specify server:
  //Blynk.begin(auth, "blynk-cloud.com", 80);
  //Blynk.begin(auth, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "Ethernet Shield W5500" : {
    inc: `
#include <SPI.h>
#include <Ethernet2.h>
#include <BlynkSimpleEthernet2.h>
    `,
    init: `
  Blynk.begin(auth);
  // You can also specify server:
  //Blynk.begin(auth, "blynk-cloud.com", 80);
  //Blynk.begin(auth, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "ENC28J60" : {
    comment : `
  For this example you need UIPEthernet library:
    https://github.com/UIPEthernet/UIPEthernet

  Typical wiring would be (this is for Arduino UNO,
  search for correct wiring for your board):
   VCC -- 5V
   GND -- GND
   CS  -- D10
   SI  -- D11
   SCK -- D13
   SO  -- D12
   INT -- D2
    `,
    inc: `
#include <UIPEthernet.h>
#include <BlynkSimpleUIPEthernet.h>
    `,
    init: `
  Blynk.begin(auth);
  // You can also specify server:
  //Blynk.begin(auth, "blynk-cloud.com", 80);
  //Blynk.begin(auth, IPAddress(192,168,1,100), 8080);
    `
  },

  /***********************************************************/
  "--- WiFi" : {},
  /***********************************************************/
  "Arduino WiFi Shield 101" : {
    inc: `
#include <SPI.h>
#include <WiFi101.h>
#include <BlynkSimpleWiFiShield101.h>
    `,
    inherit : "Arduino WiFi Shield"
  },
  /***********************************************/
  "Arduino WiFi Shield"     : {
    inc: `
#include <SPI.h>
#include <WiFi.h>
#include <BlynkSimpleWifi.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
    `,
    init: `
  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "ESP8266 WiFi Shield"     : {
    comment: `
  WARNING!
    It's very tricky to get it working. Please read this article:
    http://help.blynk.cc/hardware-and-libraries/arduino/esp8266-with-at-firmware
    `,
    inc: `
#include <ESP8266_Lib.h>
#include <BlynkSimpleShieldEsp8266.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";

// Hardware Serial on Mega, Leonardo, Micro...
#define EspSerial Serial1

// or Software Serial on Uno, Nano...
//#include <SoftwareSerial.h>
//SoftwareSerial EspSerial(2, 3); // RX, TX

// Your ESP8266 baud rate:
#define ESP8266_BAUD 38400

ESP8266 wifi(&EspSerial);
    `,
    init: `
  // Set ESP8266 baud rate
  EspSerial.begin(ESP8266_BAUD);
  delay(10);

  Blynk.begin(auth, wifi, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, wifi, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, wifi, ssid, pass, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "CC3000" : {
    comment: `
  For this example you need Adafruit_CC3000_Library library:
    https://github.com/adafruit/Adafruit_CC3000_Library

  Note: Firmware version 1.14 or later is preferred.
    `,
    inc: `
// These are the interrupt and control pins for СС3000
#define ADAFRUIT_CC3000_IRQ   3
#define ADAFRUIT_CC3000_VBAT  5
#define ADAFRUIT_CC3000_CS    10

#include <SPI.h>
#include <Adafruit_CC3000.h>
#include <BlynkSimpleCC3000.h>
    `,
    glob : `
// Your WiFi credentials.
// Choose wifi_sec from WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA or WLAN_SEC_WPA2
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
int wifi_sec = WLAN_SEC_WPA2;
    `,
    init: `
  Blynk.begin(auth, ssid, pass, wifi_sec);
    `
  },
  /***********************************************/
  "RN-XV WiFly" : {
    comment: `
  For this example you need WiFlyHQ library:
    https://github.com/harlequin-tech/WiFlyHQ

  Note: Ensure a stable serial connection!
        Hardware serial is preferred.
        Firmware version 4.41 or later is preferred.
    `,
    inc: `
#include <WiFlyHQ.h>
#include <BlynkSimpleWiFly.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";

#define WiFlySerial Serial1
// This can be a SoftwareSerial object:
//#include <SoftwareSerial.h>
//SoftwareSerial WiFlySerial(2, 3); // RX, TX

WiFly wifly;
    `,
    init: `
  WiFlySerial.begin(9600);  // Set your RN-XV baud rate
  delay(10);

  // Bind WiFly driver to the serial
  if (!wifly.begin(&WiFlySerial)) {
    BLYNK_FATAL("Failed to start wifly");
  }

  // You can try increasing baud rate:
  //wifly.setBaud(115200);
  //WiFlySerial.begin(115200);

  Blynk.begin(auth, wifly, ssid, pass);
    `
  },

  /***********************************************************/
  "--- Bluetooth" : {},
  /***********************************************************/
  "nRF8001"   : {
    comment: `
  For this example you need BLEPeripheral library
    from http://librarymanager/all#BLEPeripheral
    or https://github.com/sandeepmistry/arduino-BLEPeripheral

  Warning: Bluetooth support is in beta!
    `,
    inc: `
#include <BlynkSimpleSerialBLE.h>
#include <BLEPeripheral.h>
#include "BLESerial.h"
#include <SPI.h>
    `,
    glob : `
// define pins (varies per shield/board)
#define BLE_REQ   10
#define BLE_RDY   2
#define BLE_RST   9

// create ble serial instance, see pinouts above
BLESerial SerialBLE(BLE_REQ, BLE_RDY, BLE_RST);
    `,
    init: `
  SerialBLE.setLocalName("Blynk");
  SerialBLE.setDeviceName("Blynk");
  SerialBLE.setAppearance(0x0080);
  SerialBLE.begin();

  Blynk.begin(SerialBLE, auth);

  Serial.println("Waiting for connections...");
    `,
    loop: `
  SerialBLE.poll();
    `
  },
  /***********************************************/
  "HM10 or HC08" : {
    need_serial: true,
    comment: `
  Warning: Bluetooth support is in beta!
    `,
    inc: `
#include <BlynkSimpleSerialBLE.h>
    `,
    init: `
  SerialBLE.begin(9600);
  Blynk.begin(SerialBLE, auth);

  Serial.println("Waiting for connections...");
    `
  },
  /***********************************************/
  "HC05 or HC06" : {
    comment: `
  Note: This only works on Android!
        iOS does not support Bluetooth 2.0 Serial Port Profile
        You may need to pair the module with your smartphone
        via Bluetooth settings. Default pairing password is 1234

  Feel free to apply it to any other example. It's simple!

  NOTE: Bluetooth support is in beta!
    `,
    inherit: "HM10 or HC08"
  },
  "Adafruit Bluefruit LE" : { inherit: "nRF8001" },

  /***********************************************************/
  "--- Cellular" : {},
  /***********************************************************/
  "SimCOM SIM800" : {
    comment: `
  WARNING: GSM modem support is for BETA testing.
    `,
    defs: `
#define TINY_GSM_MODEM_SIM800
    `,
    inc: `
// Default heartbeat interval for GSM is 60
// If you want override this value, uncomment and set this option:
//#define BLYNK_HEARTBEAT 30

#include <TinyGsmClient.h>
#include <BlynkSimpleSIM800.h>
    `,
    glob : `
// Your GPRS credentials
// Leave empty, if missing user or pass
char apn[]  = "YourAPN";
char user[] = "";
char pass[] = "";

// Hardware Serial on Mega, Leonardo, Micro
#define SerialAT Serial1

// or Software Serial on Uno, Nano
//#include <SoftwareSerial.h>
//SoftwareSerial SerialAT(2, 3); // RX, TX

TinyGsm modem(SerialAT);
    `,
    init: `
  delay(10);

  // Set GSM module baud rate
  SerialAT.begin(115200);
  delay(3000);

  // Restart takes quite some time
  // To skip it, call init() instead of restart()
  Serial.println("Initializing modem...");
  modem.restart();

  // Unlock your SIM card with a PIN
  //modem.simUnlock("1234");

  Blynk.begin(auth, modem, apn, user, pass);
    `
  },
  /***********************************************/
  "SimCOM SIM900" : {
    defs: `
#define TINY_GSM_MODEM_SIM900
    `,
    inherit: "SimCOM SIM800"
  },
  /***********************************************/
  "Neoway M590"   : {
    defs: `
#define TINY_GSM_MODEM_M590
    `,
    inherit: "SimCOM SIM800"
  },
  /***********************************************************/
  "--- Serial" : {},
  /***********************************************************/
  "Serial or USB" : {
    need_serial: true,
    swap_serial: true,
    name: "Hardware Serial or USB",
    comment : ``,
    inc: `
#include <BlynkSimpleStream.h>
    `,
    init: `
  // Blynk will work through <%= serial_dat %>
  // Do not read or write this serial manually in your sketch
  <%= serial_dat %>.begin(9600);
  Blynk.begin(<%= serial_dat %>, auth);
    `
  },
  /***********************************************/
  "Serial1" : {
    name: "Hardware Serial1",
    comment : ``,
    inc: `
#include <BlynkSimpleStream.h>
    `,
    init: `
  // Blynk will work through Serial1
  // Do not read or write this serial manually in your sketch
  Serial1.begin(9600);
  Blynk.begin(Serial1, auth);
    `
  },
  /***********************************************/
  "SoftwareSerial" : {
    comment : ``,
    inc: `
#include <BlynkSimpleStream.h>
#include <SoftwareSerial.h>
    `,
    glob : `
SoftwareSerial SwSerial(10, 11); // RX, TX
    `,
    init: `
  // Blynk will work through SoftwareSerial
  // Do not read or write this serial manually in your sketch
  SwSerial.begin(9600);
  Blynk.begin(SwSerial, auth);
    `
  },

  /***********************************************************
   * EMBEDDED
   ***********************************************************/
  "Default" : {
    embedded: true,
    name: "Arduino Ethernet Shield",
    inc: `
#include <SPI.h>
#include <Ethernet.h>
#include <BlynkSimpleEthernet.h>
    `,
    init: `
  Blynk.begin(auth);
    `
  },
  /***********************************************/
  "System default" : {
    // Empty
    embedded: true
  },
  "ESP8266 WiFi" : {
    embedded: true,
    inc: `
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
    `,
    init: `
  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "ESP8266 WiFi (SSL)" : {
    embedded: true,
    inc: `
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266_SSL.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
    `,
    init: `
  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "ESP32 WiFi" : {
    embedded: true,
    inc: `
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
    `,
    init: `
  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "Yun Bridge" : {
    embedded: true,
    inc: `
#include <Bridge.h>
#include <BlynkSimpleYun.h>
    `,
    init: `
  Blynk.begin(auth);
  // You can also specify server:
  //Blynk.begin(auth, "blynk-cloud.com", 80);
  //Blynk.begin(auth, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "Particle WiFi" : {
    embedded: true,
    inc: `
#include <blynk.h>
    `,
    init: `
  delay(5000); // Allow board to settle
  Blynk.begin(auth);
    `
  },
  /***********************************************/
  "Particle Cellular" : {
    embedded: true,
    inc: `
// Uncomment this, if you want to set network credentials
//#include "cellular_hal.h"
//STARTUP(cellular_credentials_set("broadband", "", "", NULL));

// Run "ping blynk-cloud.com", and set Blynk IP to the shown address
#define BLYNK_IP        IPAddress(45,55,130,102)

// Set Blynk hertbeat interval.
// Each heartbeat uses ~90 bytes of data.
#define BLYNK_HEARTBEAT 60

// Set Particle keep-alive ping interval.
// Each ping uses 121 bytes of data.
#define PARTICLE_KEEPALIVE 20

#include <blynk.h>
    `,
    init: `
  delay(2000);

  Particle.keepAlive(PARTICLE_KEEPALIVE);
  Blynk.begin(auth, BLYNK_IP);
    `
  },
  /***********************************************/
  "Arduino 101 BLE" : {
    embedded: true,
    comment: `
  Note: This requires CurieBLE library
    from http://librarymanager/all#CurieBLE

  Warning: Bluetooth support is in beta!
    `,
    inc: `
#include <BlynkSimpleCurieBLE.h>
#include <CurieBLE.h>
    `,
    glob : `
BLEPeripheral  blePeripheral;
    `,
    init: `
  delay(1000);

  blePeripheral.setLocalName("Blynk");
  blePeripheral.setDeviceName("Blynk");
  blePeripheral.setAppearance(384);

  Blynk.begin(blePeripheral, auth);

  blePeripheral.begin();

  Serial.println("Waiting for connections...");
    `,
    loop: `
  blePeripheral.poll();
    `
  }
};

module.exports = shields;
