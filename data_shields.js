'use strict';

const shields = {
  /***********************************************************/
  "--- Ethernet" : {},
  /***********************************************************/
  "Ethernet Shield W5100" : {
    name: "Arduino Ethernet Shield",
    comment: `
  This example shows how to use Arduino Ethernet shield (W5100)
  to connect your project to Blynk.

  NOTE: Pins 10, 11, 12 and 13 are reserved for Ethernet module.
        DON'T use them in your sketch directly!

  WARNING: If you have an SD card, you may need to disable it
        by setting pin 4 to HIGH. Read more here:
        https://www.arduino.cc/en/Main/ArduinoEthernetShield
    `,
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

  Blynk.begin(BLYNK_AUTH_TOKEN);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, IPAddress(192,168,1,100), 8080);
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
  Blynk.begin(BLYNK_AUTH_TOKEN);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, IPAddress(192,168,1,100), 8080);
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
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, IPAddress(192,168,1,100), 8080);
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

  Blynk.begin(BLYNK_AUTH_TOKEN, wifi, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, wifi, ssid, pass, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, wifi, ssid, pass, IPAddress(192,168,1,100), 8080);
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

  Blynk.begin(BLYNK_AUTH_TOKEN, wifly, ssid, pass);
    `
  },

  /***********************************************************/
  "--- Cellular" : {},
  /***********************************************************/
  "SimCOM SIM800" : {
    comment: `
  Attention! Please check out TinyGSM guide:
    https://tiny.cc/tinygsm-readme

  Change GPRS apm, user, pass, and Blynk auth token to run :)
    `,
    defs: `
#define TINY_GSM_MODEM_SIM800
    `,
    inc: `
// Default heartbeat interval for GSM is 60
// If you want override this value, uncomment and set this option:
//#define BLYNK_HEARTBEAT 30

#include <TinyGsmClient.h>
#include <BlynkSimpleTinyGSM.h>
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

  Blynk.begin(BLYNK_AUTH_TOKEN, modem, apn, user, pass);
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
  Blynk.begin(<%= serial_dat %>, BLYNK_AUTH_TOKEN);
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
  Blynk.begin(Serial1, BLYNK_AUTH_TOKEN);
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
  Blynk.begin(SwSerial, BLYNK_AUTH_TOKEN);
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
  Blynk.begin(BLYNK_AUTH_TOKEN);
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
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, IPAddress(192,168,1,100), 8080);
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
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 443);
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, IPAddress(192,168,1,100), 8443);
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
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "ESP32 WiFi (SSL)" : {
    embedded: true,
    inc: `
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32_SSL.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
    `,
    init: `
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 443);
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, IPAddress(192,168,1,100), 8443);
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
  Blynk.begin(BLYNK_AUTH_TOKEN);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "rpcWiFi" : {
    embedded: true,
    inc: `
#include <rpcWiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleWioTerminal.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
    `,
    init: `
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 80);
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, IPAddress(192,168,1,100), 8080);
    `
  },
  /***********************************************/
  "rpcWiFi (SSL)" : {
    embedded: true,
    inc: `
#include <rpcWiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleWioTerminal_SSL.h>
    `,
    glob : `
// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";
    `,
    init: `
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  // You can also specify server:
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 443);
  //Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, IPAddress(192,168,1,100), 8443);
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
  Blynk.begin(BLYNK_AUTH_TOKEN);
    `
  },
  /***********************************************/
  "Particle Cellular" : {
    embedded: true,
    inc: `
// Uncomment this, if you want to set network credentials
//#include "cellular_hal.h"
//STARTUP(cellular_credentials_set("broadband", "", "", NULL));

// Run "ping blynk.cloud", and set Blynk IP to the shown address
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
  Blynk.begin(BLYNK_AUTH_TOKEN, BLYNK_IP);
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

  Blynk.begin(blePeripheral, BLYNK_AUTH_TOKEN);

  blePeripheral.begin();

  Serial.println("Waiting for connections...");
    `,
    loop: `
  blePeripheral.poll();
    `
  }
};

module.exports = shields;
