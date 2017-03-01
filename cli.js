'use strict';

var fs    = require('fs');
var path  = require('path');

var gen   = require("./index.js");

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

var mkdirpSync = function (dirpath) {
  var parts = dirpath.split(path.sep);
  for( var i = 1; i <= parts.length; i++ ) {
    mkdirSync( path.join.apply(null, parts.slice(0, i)) );
  }
}

const cmd = process.argv[2];
if (cmd === "gen") {
  var board = process.argv[3];
  var shield = process.argv[4];
  var example = process.argv[5];
/*
  if (!_.has(boards, board)) {
    console.error("Board not found");
    process.exit(1);
  }
  if (!_.has(shields, shield)) {
    console.error("Shield not found");
    process.exit(1);
  }
  if (!_.has(examples, example)) {
    console.error("Example not found");
    process.exit(1);
  }
*/
  console.log(gen.generate(board, shield, example));
} else if (cmd === "list") {
  const c = process.argv[3];
  if (c === "boards") {
    console.log(gen.listBoards());
  } else if (c === "shields") {
    console.log(gen.listShields());
  } else if (c === "examples") {
    console.log(gen.listExamples());
  }

} else if (cmd === "count") {
  const brd = gen.listBoards().length;
  const shld = gen.listShields().length;
  const xmpl = gen.listExamples().length;
  const comb = brd * shld * xmpl;

  console.log("boards qty:", brd);
  console.log("shields qty:", shld);
  console.log("examples qty:", xmpl);
  console.log();
  console.log("combinations:", comb);
} else if (cmd === "autogen") {
  var board = process.argv[3];
  var shield = process.argv[4];

  gen.listExamples().forEach((k) => {
    var ino = k.split(path.sep).slice(-1)[0] + ".ino";
    console.log(ino);
    mkdirpSync("./examples/" + k);

    var sketch = gen.generate(board, shield, k);
    fs.writeFileSync("./examples/" + k + "/" + ino, sketch);
  });

  const boards_presets = {
    "Boards_WiFi/Adafruit_Feather_M0_WiFi"       : ["", ""],
    "Boards_WiFi/Arduino_MKR1000"                : ["", ""],
    "Boards_WiFi/Arduino_WiFi_Shield"            : ["", ""],
    "Boards_WiFi/Arduino_WiFi_Shield_101"        : ["", ""],
    "Boards_WiFi/Arduino_Yun"                    : ["", ""],
    "Boards_WiFi/CC3000"                         : ["", ""],
    "Boards_WiFi/Digistump_Oak"                  : ["", ""],
    "Boards_WiFi/Energia_WiFi"                   : ["", ""],
    "Boards_WiFi/ESP32_WiFi"                     : ["", ""],
    "Boards_WiFi/ESP8266_Shield"                 : ["", ""],
    "Boards_WiFi/ESP8266_Standalone"             : ["", ""],
    "Boards_WiFi/ESP8266_Standalone_SSL"         : ["", ""],
    "Boards_WiFi/Fishino"                        : ["", ""],
    "Boards_WiFi/Intel_Edison_WiFi"              : ["", ""],
    "Boards_WiFi/LinkItONE"                      : ["", ""],
    "Boards_WiFi/RedBear_Duo_WiFi"               : ["", ""],
    "Boards_WiFi/RN_XV_WiFly"                    : ["", ""],
    "Boards_WiFi/Sparkfun_Blynk_Board"           : ["", ""],
    "Boards_WiFi/TheAirBoard_WiFly"              : ["", ""],
    "Boards_WiFi/TinyDuino_WiFi"                 : ["", ""],
    "Boards_WiFi/WildFire_V3"                    : ["", ""],
    "Boards_WiFi/WildFire_V4"                    : ["", ""],

    "Boards_Bluetooth/Adafruit_Bluefruit_LE"     : ["", ""],
    "Boards_Bluetooth/Adafruit_Feather_32u4_BLE" : ["", ""],
    "Boards_Bluetooth/Arduino_101_BLE"           : ["", ""],
    "Boards_Bluetooth/BBC_MicroBit"              : ["", ""],
    "Boards_Bluetooth/DFRobot_Bluno_BLE_Link"    : ["", ""],
    "Boards_Bluetooth/Energia_BLE"               : ["", ""],
    "Boards_Bluetooth/LightBlue_Bean"            : ["", ""],
    "Boards_Bluetooth/Microduino_BLE"            : ["", ""],
    "Boards_Bluetooth/nRF8001"                   : ["", ""],
    "Boards_Bluetooth/RedBear_Duo_BLE"           : ["", ""],
    "Boards_Bluetooth/RedBearLab_BLE_Mini"       : ["", ""],
    "Boards_Bluetooth/RedBearLab_BLE_Nano"       : ["", ""],
    "Boards_Bluetooth/RedBearLab_BlendMicro"     : ["", ""],
    "Boards_Bluetooth/RFDuino_BLE"               : ["", ""],
    "Boards_Bluetooth/Serial_HC05_HC06"          : ["", ""],
    "Boards_Bluetooth/Serial_HM10_HC08"          : ["", ""],
    "Boards_Bluetooth/Simblee_BLE"               : ["", ""],
    "Boards_Bluetooth/TheAirBoard_BLE_Link"      : ["", ""],

    "Boards_GSM/SIM800_SIM900"                   : ["", ""],

    "Boards_Ethernet/Arduino_Ethernet"           : ["", ""],
    "Boards_Ethernet/Arduino_Ethernet_Manual"    : ["", ""],
    "Boards_Ethernet/Arduino_Ethernet2"          : ["", ""],
    "Boards_Ethernet/ENC28J60"                   : ["", ""],
    "Boards_Ethernet/Energia_Ethernet"           : ["", ""],
    "Boards_Ethernet/Intel_Galileo"              : ["", ""],
    "Boards_Ethernet/Seeed_EthernetV2_0"         : ["", ""],

    "Boards_USB_Serial/Arduino_Serial_USB"       : ["", ""],
    "Boards_USB_Serial/Arduino_SoftwareSerial"   : ["", ""],
    "Boards_USB_Serial/Arduino_Zero_M0_Serial"   : ["", ""],
    "Boards_USB_Serial/ATtiny85"                 : ["", ""],
    "Boards_USB_Serial/Blue_Pill_STM32F103C"     : ["", ""],
    "Boards_USB_Serial/chipKIT_Uno32"            : ["", ""],
    "Boards_USB_Serial/Digistump_Digispark"      : ["", ""],
    "Boards_USB_Serial/Energia_Serial_USB"       : ["", ""],
    "Boards_USB_Serial/Teensy3"                  : ["", ""],
  };
/*
  Object.keys(boards_presets).forEach((k) => {
    var ino = k.split(path.sep).slice(-1)[0] + ".ino";
    console.log(ino);
    mkdirpSync("./examples/" + k);

    var args = boards_presets[k];
    var sketch = gen.generate(...args, "Simple");
    fs.writeFileSync("./examples/" + k + "/" + ino, sketch);
  });
*/
}
