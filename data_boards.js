'use strict';

const header_comment =
`/*************************************************************
  <%= board.comment %>

  <%= example.comment %>
 *************************************************************/
`;

const ArduinoRegularTemplate = header_comment + `
/* Fill-in information from Blynk Device Info here */
#define BLYNK_TEMPLATE_ID           "<%= tmpl_id %>"
#define BLYNK_TEMPLATE_NAME         "<%= dev_name %>"
#define BLYNK_AUTH_TOKEN            "<%= auth %>"

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT <%= serial_dbg %>

<%= board.defs %>
<%= example.defs %>

<%= board.inc %>
<%= example.inc %>

<%= board.glob %>

<%= example.glob %>

void setup()
{
  // Debug console
  <%= serial_dbg %>.begin(115200);

  <%= board.init %>

  <%= example.init %>
}

void loop()
{
  <%= board.loop %>
  Blynk.run();
  <%= example.loop %>
}

`;

const RaspberryTemplate = header_comment + `
/* Fill-in information from Blynk Device Info here */
#define BLYNK_TEMPLATE_ID           "<%= tmpl_id %>"
#define BLYNK_TEMPLATE_NAME         "<%= dev_name %>"

// Comment this out to disable prints and save space
#define BLYNK_PRINT <%= serial_dbg %>

#ifdef RASPBERRY
 #include <BlynkApiWiringPi.h>
#else
 #include <BlynkApiLinux.h>
#endif
#include <BlynkSocket.h>
#include <BlynkOptionsParser.h>

<%= example.inc %>

static BlynkTransportSocket _blynkTransport;
BlynkSocket Blynk(_blynkTransport);
#include <BlynkWidgets.h>

<%= example.glob %>

void setup()
{
  <%= example.init %>
}

void loop()
{
  Blynk.run();
  <%= example.loop %>
}

int main(int argc, char* argv[])
{
  const char *auth, *serv;
  uint16_t port;
  parse_options(argc, argv, auth, serv, port);

  Blynk.begin(auth, serv, port);

  setup();
  while(true) {
    loop();
  }

  return 0;
}

`;

const Raspberry = {
  template: RaspberryTemplate,
  serial_dbg: "stdout",
};

const ArduinoRegular = {
  template: ArduinoRegularTemplate,
  serial_dbg: "Serial",
  exclude: [/Serial1/]
};

const ArduinoUSB = {
  template: ArduinoRegularTemplate,
  serial_dbg: "SerialUSB",
  serial_dat: "Serial",
};

const ArduinoSerial1 = {
  template: ArduinoRegularTemplate,
  serial_dbg: "Serial",
  serial_dat: "Serial1"
};

const boards = {
  /***********************************************/
  "--- Espressif" : {},
  /***********************************************/
  "ESP8266" : {
    builtin: ["ESP8266 WiFi", "ESP8266 WiFi (SSL)"],
    exclude: [/.*/]
  },
  "ESP32" : {
    builtin: ["ESP32 WiFi", "ESP32 WiFi (SSL)"],
    exclude: [/.*/]
  },
  "NodeMCU"                : { inherit: "ESP8266" },
  "WeMos D1"               : { inherit: "ESP8266" },
  "Adafruit Huzzah"        : { inherit: "ESP8266" },
  "SparkFun Blynk Board"   : { inherit: "ESP8266" },
  "SparkFun ESP8266 Thing" : { inherit: "ESP8266" },
  
  /***********************************************/
  "--- Seeed Studio" : {},
  /***********************************************/
  "Wio Terminal" : {
    builtin: ["rpcWiFi", "rpcWiFi (SSL)"],
    exclude: [/.*/]
  },

  /***********************************************/
  "--- Linux (C++)" : {},
  /***********************************************/
  "Raspberry Pi" : {
    exclude: [/.*/],
    builtin: ["System default"],
    inherit: Raspberry
  },
  "Ubuntu" : {
    inherit: "Raspberry Pi"
  },
  /***********************************************/
  "--- Arduino" : {},
  /***********************************************/
  "Arduino Uno" : {
  },
  "Arduino MKR1000" :
  {
    inherit: "Arduino Zero",
    builtin: ["Arduino WiFi Shield 101"],
    exclude: [/Serial/, /Ethernet/, /WiFly/, /CC3000/]
  },
  "Arduino MKR1010" :
  {
    inherit: "Arduino Zero",
    builtin: ["WiFiNINA"],
    exclude: [/Serial/, /WiFly/, /CC3000/]
  },
  "Arduino MKR1400" :
  {
    inherit: "Arduino Zero",
    builtin: ["MKRGSM"],
    exclude: [/Serial/, /WiFly/, /CC3000/]
  },
  "Arduino MKRZero"          : { inherit: "Arduino MKR1000" },

  "Arduino Yun" : {
    builtin: ["Yun Bridge"],
    exclude: [/.*/]
  },
  "Arduino Zero" : {
    inherit: ArduinoUSB
  },
  "Arduino M0"               : { inherit: "Arduino Zero" },
  "Arduino M0 Pro"           : { inherit: "Arduino Zero" },

  "Arduino Nano" : {
    exclude: [/Ethernet/, /WiFi/],
    inherit: "Arduino Uno"
  },
  "Arduino Leonardo" : {
    inherit: ArduinoSerial1
  },
  "Arduino Due" : {
  },

  "Arduino Mega 2560" : {
    exclude: [/SoftwareSerial/],
    inherit: ArduinoSerial1
  },
  "Arduino Mega 1280"        : { inherit: "Arduino Mega 2560" },
  "Arduino Mega ADK"         : { inherit: "Arduino Mega 2560" },
  "Arduino Micro"            : { inherit: "Arduino Leonardo"  },
  "Arduino Pro Micro"        : { inherit: "Arduino Leonardo",
                                 exclude: [/Ethernet/, /WiFi/] },

  "Arduino Mini"             : { inherit: "Arduino Nano" },
  "Arduino Pro Mini"         : { inherit: "Arduino Nano" },
  "Arduino Fio"              : { inherit: "Arduino Nano" },
  "Arduino Diecimila"        : { inherit: "Arduino Uno" },
  "Arduino Duemilanove"      : { inherit: "Arduino Uno" },
  "Arduino Pro"              : { inherit: "Arduino Uno" },

  "Arduino Ethernet"         : { inherit: "Arduino Uno", builtin: ["Ethernet Shield W5100"] },
  "Arduino Leonardo ETH"     : { inherit: "Arduino Leonardo", builtin: ["Ethernet Shield W5500"] },
  "Arduino Industrial 101"   : { inherit: "Arduino Yun" },

  /***********************************************/
  "--- Particle" : {},
  /***********************************************/
  "Particle Core" : {
    inherit: "Particle Photon"
  },
  "Particle Photon" : {
    builtin: ["Particle WiFi"],
    exclude: [/.*/]
  },
  "Particle Electron" : {
    builtin: ["Particle Cellular"],
    exclude: [/.*/]
  },
  "Particle Argon" : {
    builtin: ["Particle WiFi"],
    exclude: [/.*/]
  },
  "Particle Boron" : {
    builtin: ["Particle Cellular"],
    exclude: [/.*/]
  },
};

Object.keys(boards).forEach((k) => {
  if (boards[k].inherit === undefined) {
    boards[k] = Object.assign({}, ArduinoRegular, boards[k]);
  }
});

module.exports = boards;
