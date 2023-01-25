'use strict';

const examples = {
  /*
  "Simple" : {
  },
  */
  /***********************************************************
   * GettingStarted
   ***********************************************************/
  "GettingStarted/BlynkBlink" : {
    comment : `
  You’ll need:
   - Blynk IoT app (download from App Store or Google Play)
   - <%= name %> board
   - Decide how to connect to Blynk
     (USB, Ethernet, Wi-Fi, Bluetooth, ...)

  There is a bunch of great example sketches included to show you how to get
  started. Think of them as LEGO bricks  and combine them as you wish.
  For example, take the Ethernet Shield sketch and combine it with the
  Servo example, or choose a USB sketch and add a code from SendData
  example.
    `,
    loop: `
  // You can inject your own code or combine it with other sketches.
  // Check other examples on how to communicate with Blynk. Remember
  // to avoid delay() function!
    `
  },
  "GettingStarted/BlynkSimpleDemo" : {
    comment : `
  This is a simple demo of sending and receiving some data.
  Be sure to check out other examples!
    `,
    glob: `
BlynkTimer timer;

// This function is called every time the Virtual Pin 0 state changes
BLYNK_WRITE(V0)
{
  // Set incoming value from pin V0 to a variable
  int value = param.asInt();

  // Update state
  Blynk.virtualWrite(V1, value);
}

// This function is called every time the device is connected to the Blynk.Cloud
BLYNK_CONNECTED()
{
  // Change Web Link Button message to "Congratulations!"
  Blynk.setProperty(V3, "offImageUrl", "https://static-image.nyc3.cdn.digitaloceanspaces.com/general/fte/congratulations.png");
  Blynk.setProperty(V3, "onImageUrl",  "https://static-image.nyc3.cdn.digitaloceanspaces.com/general/fte/congratulations_pressed.png");
  Blynk.setProperty(V3, "url", "https://docs.blynk.io/en/getting-started/what-do-i-need-to-blynk/how-quickstart-device-was-made");
}

// This function sends Arduino's uptime every second to Virtual Pin 2.
void myTimerEvent()
{
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V2, millis() / 1000);
}
    `,
    init: `
  // Setup a function to be called every second
  timer.setInterval(1000L, myTimerEvent);
    `,
    loop: `
  timer.run();
  // You can inject your own code or combine it with other sketches.
  // Check other examples on how to communicate with Blynk. Remember
  // to avoid delay() function!
    `
  },
  /***********************************************/
  "GettingStarted/GetData" : {
    comment : `
  You can use this sketch as a debug tool that prints all incoming values
  sent by a widget connected to a Virtual Pin 1 in the Blynk App.

  App dashboard setup:
    Slider widget (0...100) on V1
    `,
    glob: `
// This function will be called every time Slider Widget
// in Blynk app writes values to the Virtual Pin 1
BLYNK_WRITE(V1)
{
  int pinValue = param.asInt(); // assigning incoming value from pin V1 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  <%= serial_dbg %>.print("V1 Slider value is: ");
  <%= serial_dbg %>.println(pinValue);
}
    `,
  },
  /***********************************************/
  "GettingStarted/PushData" : {
    comment : `
  This example shows how value can be pushed from Arduino to
  the Blynk App.

  NOTE:
  BlynkTimer provides SimpleTimer functionality:
    http://playground.arduino.cc/Code/SimpleTimer

  App dashboard setup:
    Value Display widget attached to Virtual Pin V5
    `,
    glob: `
BlynkTimer timer;

// This function sends Arduino's up time every second to Virtual Pin (5).
// In the app, Widget's reading frequency should be set to PUSH. This means
// that you define how often to send data to Blynk App.
void myTimerEvent()
{
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V5, millis() / 1000);
}
    `,
    init: `
  // Setup a function to be called every second
  timer.setInterval(1000L, myTimerEvent);
    `,
    loop: `
  timer.run(); // Initiates BlynkTimer
    `
  },
  /***********************************************/
  "GettingStarted/PushDataOnRequest" : {
    comment : `
  This example shows how to send values to the Blynk App,
  when there is a widget, attached to the Virtual Pin and it
  is set to some frequency

  Project setup in the app:
    Value Display widget attached to V5. Set any reading
    frequency (i.e. 1 second)
    `,
    glob: `
// Use Virtual pin 5 for uptime display
#define PIN_UPTIME V5

// This function tells Arduino what to do if there is a Widget
// which is requesting data for Virtual Pin (5)
BLYNK_READ(PIN_UPTIME)
{
  // This command writes Arduino's uptime in seconds to Virtual Pin (5)
  Blynk.virtualWrite(PIN_UPTIME, millis() / 1000);
}
    `
  },
  /***********************************************/
  "GettingStarted/Servo" : {
    comment : `
  Rotate a servo using a slider!

  App dashboard setup:
    Slider widget (0...180) on V3
    `,
    inc: `
#include <Servo.h>
    `,
    glob: `
Servo servo;

BLYNK_WRITE(V3)
{
  servo.write(param.asInt());
}
    `,
    init: `
servo.attach(9);
    `,
  },


  /***********************************************/
  "GettingStarted/VirtualPinRead" : {
    comment : `
  This sketch shows how to read values from Virtual Pins

  App dashboard setup:
    Slider widget (0...100) on Virtual Pin V1
    `,
    glob: `
// This function will be called every time Slider Widget
// in Blynk app writes values to the Virtual Pin V1
BLYNK_WRITE(V1)
{
  int pinValue = param.asInt(); // assigning incoming value from pin V1 to a variable

  // process received value
}
    `
  },
  /***********************************************/
  "GettingStarted/VirtualPinReply" : {
    comment : `
  This example shows how to send requested values to the Blynk App

  Project setup in the app:
    Value Display widget attached to V5. Set any reading
    frequency (i.e. 1 second)
    `,
    glob: `
// This function is called when there is a Widget
// which is requesting data from Virtual Pin (5)
BLYNK_READ(V5)
{
  // This command writes Arduino's uptime in seconds to Virtual Pin (5)
  Blynk.virtualWrite(V5, millis() / 1000);
}

    `
  },
  /***********************************************/
  "GettingStarted/VirtualPinWrite" : {
    comment : `
  This sketch shows how to write values to Virtual Pins

  NOTE:
  BlynkTimer provides SimpleTimer functionality:
    http://playground.arduino.cc/Code/SimpleTimer

  App dashboard setup:
    Value Display widget attached to Virtual Pin V5
    `,
    glob: `
BlynkTimer timer;

// This function sends Arduino's up time every second to Virtual Pin (5).
// In the app, Widget's reading frequency should be set to PUSH. This means
// that you define how often to send data to Blynk App.
void myTimerEvent()
{
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V5, millis() / 1000);
}
    `,
    init: `
  // Setup a function to be called every second
  timer.setInterval(1000L, myTimerEvent);
    `,
    loop: `
  timer.run(); // Initiates BlynkTimer
    `
  },

  /***********************************************************
   * Widgets
   ***********************************************************/
  "Widgets/Bridge" : {
    comment : `
  Control another device using Bridge widget!

  Bridge is initialized with the token of any (Blynk-enabled) device.
  After that, use the familiar functions to control it:
    bridge.digitalWrite(8, HIGH)
    bridge.digitalWrite("A0", LOW) // <- target needs to support "Named pins"
    bridge.analogWrite(3, 123)
    bridge.virtualWrite(V1, "hello")
    `,
    glob: `
// Bridge widget on virtual pin 1
WidgetBridge bridge1(V1);

// Timer for blynking
BlynkTimer timer;

static bool value = true;
void blynkAnotherDevice() // Here we will send HIGH or LOW once per second
{
  // Send value to another device
  if (value) {
    bridge1.digitalWrite(9, HIGH);  // Digital Pin 9 on the second board will be set HIGH
    bridge1.virtualWrite(V5, 1); // Sends 1 value to BLYNK_WRITE(V5) handler on receiving side.

    /////////////////////////////////////////////////////////////////////////////////////////
    // Keep in mind that when performing virtualWrite with Bridge,
    // second board will need to process the incoming command.
    // It can be done by using this handler on the second board:
    //
    //    BLYNK_WRITE(V5){
    //    int pinData = param.asInt(); // pinData variable will store value that came via Bridge
    //    }
    //
    /////////////////////////////////////////////////////////////////////////////////////////
  } else {
    bridge1.digitalWrite(9, LOW); // Digital Pin 9 on the second board will be set LOW
    bridge1.virtualWrite(V5, 0); // Sends 0 value to BLYNK_WRITE(V5) handler on receiving side.
  }
  // Toggle value
  value = !value;
}

BLYNK_CONNECTED() {
  bridge1.setAuthToken("OtherAuthToken"); // Place the AuthToken of the second hardware here
}
    `,
    init: `
  // Call blynkAnotherDevice every second
  timer.setInterval(1000L, blynkAnotherDevice);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/Joystick" : {
    comment : `
  Datastreams setup:
    Add a Virtual Pin Datastream called "Joystick" on V1. Select type: "String".

  App dashboard setup:
    Add a Joystick widget, select Advanced output mode. Attach it to "Joystick" DS.

  NOTE: Advanced mode means device will receive both x and y on a single Datastream
    `,
    glob: `
BLYNK_WRITE(V1) {
  int x = param[0].asInt();
  int y = param[1].asInt();

  // Do something with x and y
  <%= serial_dbg %>.print("X = ");
  <%= serial_dbg %>.print(x);
  <%= serial_dbg %>.print("; Y = ");
  <%= serial_dbg %>.println(y);
}
    `,
  },
  /***********************************************/
  "Widgets/LCD/LCD_SimpleMode" : {
    comment : `
  Output any data on LCD widget!

  App dashboard setup:

    LCD widget, SIMPLE mode, in widget settings :

    - Select pin V0 for zero pin
    - Select pin V1 for first pin
    - Change "Reading Frequency" to PUSH mode
    - Type into first edit field "/pin0/ seconds"
    - Type into second edit field "/pin1/ millis"
    `,
    glob: `
BlynkTimer timer;

void sendSeconds() {
  Blynk.virtualWrite(V0, millis() / 1000);
}

void sendMillis() {
  Blynk.virtualWrite(V1, millis());
}
    `,
    init: `
  // Setup a function to be called every second
  timer.setInterval(1000L, sendSeconds);
  // Setup a function to be called every second
  timer.setInterval(1000L, sendMillis);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/LCD/LCD_SimpleModeReading" : {
    comment : `
  Output any data on LCD widget!

  App dashboard setup:
    LCD widget, SIMPLE mode, in widget settings :
    - Select pin V0 for zero pin
    - Select pin V1 for first pin
    - Leave "Reading Frequency" on "1 sec" interval
    - Type into first edit field "/pin0/ seconds"
    - Type into second edit field "/pin1/ millis"
    `,
    glob: `
BLYNK_READ(V0) {
  Blynk.virtualWrite(V0, millis() / 1000);
}

BLYNK_READ(V1) {
  Blynk.virtualWrite(V1, millis());
}
    `,
  },
  /***********************************************/
  "Widgets/LCD/LCD_AdvancedMode" : {
    comment : `
  Output any data on LCD widget!

  App dashboard setup:
    LCD widget, switch to ADVANCED mode, select pin V1
    `,
    glob: `
WidgetLCD lcd(V1);
    `,
    init: `
  lcd.clear(); //Use it to clear the LCD Widget
  lcd.print(4, 0, "Hello"); // use: (position X: 0-15, position Y: 0-1, "Message you want to print")
  lcd.print(4, 1, "World");
  // Please use timed events when LCD printintg in void loop to avoid sending too many commands
  // It will cause a FLOOD Error, and connection will be dropped
    `
  },
  /***********************************************/
  "Widgets/LED/LED_Blink" : {
    comment : `
  Blynk using a LED widget on your phone!

  App dashboard setup:
    LED widget on V1

    `,
    glob: `
WidgetLED led1(V1);

BlynkTimer timer;

// V1 LED Widget is blinking
void blinkLedWidget()
{
  if (led1.getValue()) {
    led1.off();
    <%= serial_dbg %>.println("LED on V1: off");
  } else {
    led1.on();
    <%= serial_dbg %>.println("LED on V1: on");
  }
}
    `,
    init: `
  timer.setInterval(1000L, blinkLedWidget);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/LED/LED_Color" : {
    comment: `
  Blynk using a LED widget on your phone!

  App dashboard setup:
    LED widget on V1

    `,
    glob: `
WidgetLED led1(V1);

BlynkTimer timer;
bool ledStatus = false;

#define BLYNK_GREEN     "#23C48E"
#define BLYNK_BLUE      "#04C0F8"
#define BLYNK_YELLOW    "#ED9D00"
#define BLYNK_RED       "#D3435C"
#define BLYNK_DARK_BLUE "#5F7CD8"

// V1 LED Widget is blinking
void blinkLedWidget()
{
  if (ledStatus) {
    led1.setColor(BLYNK_RED);
    <%= serial_dbg %>.println("LED on V1: red");
    ledStatus = false;
  } else {
    led1.setColor(BLYNK_GREEN);
    <%= serial_dbg %>.println("LED on V1: green");
    ledStatus = true;
  }
}
`, init: `
  // Turn LED on, so colors are visible
  led1.on();
  // Setup periodic color change
  timer.setInterval(1000L, blinkLedWidget);
`, loop: `
  timer.run();
`
  },
  /***********************************************/
  "Widgets/LED/LED_Fade" : {
    comment : `
  Fade using a LED widget on your phone!

  App dashboard setup:
    LED widget on V2

    `,
    glob: `
WidgetLED led2(V2);

BlynkTimer timer;

// V2 LED Widget is fading
void fadeLedWidget()
{
  static int value = 0;
  static int delta = 30;
  value += delta;
  if (value > 255 || value < 0) {
    delta = -delta;
  } else {
    <%= serial_dbg %>.print("LED on V2: ");
    <%= serial_dbg %>.println(value);
    led2.setValue(value);
  }
}
    `,
    init: `
  timer.setInterval(300L, fadeLedWidget);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/LED/LED_StatusOfButton" : {
    comment : `
  Blynk using a LED widget on your phone!

  App dashboard setup:
    LED widget on V3
    `,
    glob: `
// Select your pin with physical button
const int btnPin = 1;

WidgetLED led3(V3);

BlynkTimer timer;

// V3 LED Widget represents the physical button state
boolean btnState = false;
void buttonLedWidget()
{
  // Read button
  boolean isPressed = (digitalRead(btnPin) == LOW);

  // If state has changed...
  if (isPressed != btnState) {
    if (isPressed) {
      led3.on();
    } else {
      led3.off();
    }
    btnState = isPressed;
  }
}
    `,
    init: `
  // Setup physical button pin (active low)
  pinMode(btnPin, INPUT_PULLUP);

  timer.setInterval(500L, buttonLedWidget);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/Map" : {
    comment : `
  Output any data on Map widget!

  App dashboard setup:
    Map widget on V1
    `,
    glob: `
WidgetMap myMap(V1);
    `,
    init: `
  // If you want to remove all points:
  //myMap.clear();

  int index = 0;
  float lat = 51.5074;
  float lon = 0.1278;
  myMap.location(index, lat, lon, "value");
    `,
  },
  /***********************************************/
  "Widgets/Menu" : {
    comment : `
  This example shows how to use the Menu Widget.

  App dashboard setup:
    Menu widget attached to V1 (put 3 items in it)
    `,
    glob: `
BLYNK_WRITE(V1) {
  switch (param.asInt())
  {
    case 1: // Item 1
      <%= serial_dbg %>.println("Item 1 selected");
      break;
    case 2: // Item 2
      <%= serial_dbg %>.println("Item 2 selected");
      break;
    case 3: // Item 3
      <%= serial_dbg %>.println("Item 3 selected");
      break;
    default:
      <%= serial_dbg %>.println("Unknown item selected");
  }
}
    `,
  },
  /***********************************************/
  "Widgets/MusicPlayer" : {
    comment : `
  This example shows how you can process commands from player widget

  App dashboard setup:
    Music Player widget attached to V5
    `,
    glob: `
BLYNK_WRITE(V5)
{
  String action = param.asStr();

  if (action == "play") {
    // Do something
  }
  if (action == "stop") {
    // Do something
  }
  if (action == "next") {
    // Do something
  }
  if (action == "prev") {
    // Do something
  }

  Blynk.setProperty(V5, "label", action);
  <%= serial_dbg %>.print(action);
  <%= serial_dbg %>.println();
}
    `,
  },
  /***********************************************/
  "Widgets/RTC" : {
    comment : `
  Blynk can provide your device with time data, like an RTC.
  Please note that the accuracy of this method is up to several seconds.

  App dashboard setup:
    Value Display widget on V1
    Value Display widget on V2

  WARNING :
  For this example you'll need Time keeping library:
    https://github.com/PaulStoffregen/Time

  This code is based on an example from the Time library:
    https://github.com/PaulStoffregen/Time/blob/master/examples/TimeSerial/TimeSerial.ino
    `,
    inc: `
#include <TimeLib.h>
#include <WidgetRTC.h>
    `,
    glob: `
BlynkTimer timer;

WidgetRTC rtc;

// Digital clock display of the time
void clockDisplay()
{
  // You can call hour(), minute(), ... at any time
  // Please see Time library examples for details

  String currentTime = String(hour()) + ":" + minute() + ":" + second();
  String currentDate = String(day()) + " " + month() + " " + year();
  <%= serial_dbg %>.print("Current time: ");
  <%= serial_dbg %>.print(currentTime);
  <%= serial_dbg %>.print(" ");
  <%= serial_dbg %>.print(currentDate);
  <%= serial_dbg %>.println();

  // Send time to the App
  Blynk.virtualWrite(V1, currentTime);
  // Send date to the App
  Blynk.virtualWrite(V2, currentDate);
}

BLYNK_CONNECTED() {
  // Synchronize time on connection
  rtc.begin();
}
    `,
    init: `
  // Other Time library functions can be used, like:
  //   timeStatus(), setSyncInterval(interval)...
  // Read more: http://www.pjrc.com/teensy/td_libs_Time.html

  setSyncInterval(10 * 60); // Sync interval in seconds (10 minutes)

  // Display digital clock every 10 seconds
  timer.setInterval(10000L, clockDisplay);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/RTC_Advanced" : {
    comment : `
  Blynk can provide your device with time data, like an RTC.
  Please note that the accuracy of this method is up to several seconds.
    `,
    glob: `
BlynkTimer timer;

void requestTime() {
  Blynk.sendInternal("rtc", "sync");
}

BLYNK_WRITE(InternalPinRTC) {
  long t = param.asLong();
  <%= serial_dbg %>.print("Unix time: ");
  <%= serial_dbg %>.print(t);
  <%= serial_dbg %>.println();
}
    `,
    init: `
  timer.setInterval(10000L, requestTime);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/Table/Table_Simple" : {
    comment : `
  You can use Table widget for logging events

  App dashboard setup:
    Default Table widget on V1
    `,
    glob: `
BlynkTimer timer;
int rowIndex = 0;

void sendEvent() {
  // adding 1 row to table every second
  Blynk.virtualWrite(V1, "add", rowIndex, "My Event", millis() / 1000);

  //highlighting latest added row in table
  Blynk.virtualWrite(V1, "pick", rowIndex);

  rowIndex++;
}
    `,
    init: `
  //clean table at start
  Blynk.virtualWrite(V1, "clr");

  //run sendEvent method every second
  timer.setInterval(1000L, sendEvent);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "Widgets/Table/Table_Advanced" : {
    comment : `
  Use Table widget to display simple value tables or events

  App dashboard setup:
    Table widget on V1
    Button widget (push) on V10
    Button widget (push) on V11
    `,
    glob: `
WidgetTable table;
BLYNK_ATTACH_WIDGET(table, V1);

int rowIndex = 0;

// Button on V10 adds new items
BLYNK_WRITE(V10) {
  if (param.asInt()) {
    table.addRow(rowIndex, "Test row", millis() / 1000);
    table.pickRow(rowIndex);
    rowIndex++;
  }
}

// Button on V11 clears the table
BLYNK_WRITE(V11) {
  if (param.asInt()) {
    table.clear();
    rowIndex = 0;
  }
}
    `,
    init: `
  // Setup table event callbacks
  table.onOrderChange([](int indexFrom, int indexTo) {
    <%= serial_dbg %>.print("Reordering: ");
    <%= serial_dbg %>.print(indexFrom);
    <%= serial_dbg %>.print(" => ");
    <%= serial_dbg %>.print(indexTo);
    <%= serial_dbg %>.println();
  });

  table.onSelectChange([](int index, bool selected) {
    <%= serial_dbg %>.print("Item ");
    <%= serial_dbg %>.print(index);
    <%= serial_dbg %>.print(selected ? " marked" : " unmarked");
  });
    `,
  },
  /***********************************************/
  "Widgets/Terminal" : {
    comment : `
  You can send/receive any data using WidgetTerminal object.

  App dashboard setup:
    Terminal widget attached to Virtual Pin V1
    `,
    glob: `
// Attach virtual serial terminal to Virtual Pin V1
WidgetTerminal terminal(V1);

// You can send commands from Terminal to your hardware. Just use
// the same Virtual Pin as your Terminal Widget
BLYNK_WRITE(V1)
{

  // if you type "Marco" into Terminal Widget - it will respond: "Polo:"
  if (String("Marco") == param.asStr()) {
    terminal.println("You said: 'Marco'") ;
    terminal.println("I said: 'Polo'") ;
  } else {

    // Send it back
    terminal.print("You said:");
    terminal.write(param.getBuffer(), param.getLength());
    terminal.println();
  }

  // Ensure everything is sent
  terminal.flush();
}
    `,
    init: `
  // Clear the terminal content
  terminal.clear();

  // This will print Blynk Software version to the Terminal Widget when
  // your hardware gets connected to Blynk Server
  terminal.println(F("Blynk v" BLYNK_VERSION ": Device started"));
  terminal.println(F("-------------"));
  terminal.println(F("Type 'Marco' and get a reply, or type"));
  terminal.println(F("anything else and get it printed back."));
  terminal.flush();
    `,
  },
  /***********************************************/
  "Widgets/TimeInput/SimpleTimeInput" : { //TODO
    comment : `
  App dashboard setup:
    Time Input widget on V1 with only start time option.
    `,
    glob: `
BLYNK_WRITE(V1) {
  long startTimeInSecs = param[0].asLong();
  <%= serial_dbg %>.println(startTimeInSecs);
  <%= serial_dbg %>.println();
}
    `,
  },
  /***********************************************/
  "Widgets/TimeInput/AdvancedTimeInput" : { //TODO
    comment : `
  App dashboard setup:
    Time Input widget on V1.
    `,
    glob: `
BLYNK_WRITE(V1) {
  TimeInputParam t(param);

  // Process start time

  if (t.hasStartTime())
  {
    <%= serial_dbg %>.println(String("Start: ") +
                   t.getStartHour() + ":" +
                   t.getStartMinute() + ":" +
                   t.getStartSecond());
  }
  else if (t.isStartSunrise())
  {
    <%= serial_dbg %>.println("Start at sunrise");
  }
  else if (t.isStartSunset())
  {
    <%= serial_dbg %>.println("Start at sunset");
  }
  else
  {
    // Do nothing
  }

  // Process stop time

  if (t.hasStopTime())
  {
    <%= serial_dbg %>.println(String("Stop: ") +
                   t.getStopHour() + ":" +
                   t.getStopMinute() + ":" +
                   t.getStopSecond());
  }
  else if (t.isStopSunrise())
  {
    <%= serial_dbg %>.println("Stop at sunrise");
  }
  else if (t.isStopSunset())
  {
    <%= serial_dbg %>.println("Stop at sunset");
  }
  else
  {
    // Do nothing: no stop time was set
  }

  // Process timezone
  // Timezone is already added to start/stop time

  <%= serial_dbg %>.println(String("Time zone: ") + t.getTZ());

  // Get timezone offset (in seconds)
  <%= serial_dbg %>.println(String("Time zone offset: ") + t.getTZ_Offset());

  // Process weekdays (1. Mon, 2. Tue, 3. Wed, ...)

  for (int i = 1; i <= 7; i++) {
    if (t.isWeekdaySelected(i)) {
      <%= serial_dbg %>.println(String("Day ") + i + " is selected");
    }
  }

  <%= serial_dbg %>.println();
}
    `,
  },
  /***********************************************/
  "Widgets/WebHook/WebHook_GET" : {
    comment : `
  This example shows how to fetch data using WebHook GET method

  App dashboard setup:
    WebHook widget on V0, method: GET, url: /pin/
    `,
    defs: `
// Allow for receiving messages up to 512 bytes long
//#define BLYNK_MAX_READBYTES 512
    `,
    glob: `
BLYNK_WRITE(V0)
{
  <%= serial_dbg %>.println("WebHook data:");
  <%= serial_dbg %>.println(param.asStr());
}
    `,
    init: `
  Blynk.virtualWrite(V0, "https://raw.githubusercontent.com/blynkkk/blynk-library/master/extras/logo.txt");

  // You can perform HTTPS requests even if your hardware alone can't handle SSL
  // Blynk  can also fetch much bigger messages,
  // if hardware has enough RAM (set BLYNK_MAX_READBYTES to 4096)
  //Blynk.virtualWrite(V0, "https://api.sunrise-sunset.org/json?lat=50.4495484&lng=30.5253873&date=2016-10-01");
    `,
  },

  /***********************************************************
   * More
   ***********************************************************/
  "More/DHT11" : {
    comment : `
  This example shows how value can be pushed from Arduino to
  the Blynk App.

  WARNING :
  For this example you'll need Adafruit DHT sensor libraries:
    https://github.com/adafruit/Adafruit_Sensor
    https://github.com/adafruit/DHT-sensor-library

  App dashboard setup:
    Value Display widget attached to V5
    Value Display widget attached to V6
    `,
    inc: `
#include <DHT.h>
    `,
    glob: `
#define DHTPIN 2          // What digital pin we're connected to

// Uncomment whatever type you're using!
#define DHTTYPE DHT11     // DHT 11
//#define DHTTYPE DHT22   // DHT 22, AM2302, AM2321
//#define DHTTYPE DHT21   // DHT 21, AM2301

DHT dht(DHTPIN, DHTTYPE);
BlynkTimer timer;

// This function sends Arduino's up time every second to Virtual Pin (5).
// In the app, Widget's reading frequency should be set to PUSH. This means
// that you define how often to send data to Blynk App.
void sendSensor()
{
  float h = dht.readHumidity();
  float t = dht.readTemperature(); // or dht.readTemperature(true) for Fahrenheit

  if (isnan(h) || isnan(t)) {
    <%= serial_dbg %>.println("Failed to read from DHT sensor!");
    return;
  }
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V5, h);
  Blynk.virtualWrite(V6, t);
}
    `,
    init: `
  dht.begin();

  // Setup a function to be called every second
  timer.setInterval(1000L, sendSensor);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "More/FormatString" : {
    comment : `
  You can construct and display any strings on a Value Display.

  App dashboard setup:
    Value Display widget attached to V5
    `,
    glob: `
BlynkTimer timer;

// This function sends Arduino's up time every second to Virtual Pin (5).
// In the app, Widget's reading frequency should be set to PUSH. This means
// that you define how often to send data to Blynk App.
void sendTemperature()
{
  // Generate random temperature value 10.0 to 30.0 (for example)
  float t = float(random(100, 300)) / 10;

  // Format: 1 decimal place, add ℃
  String str = String(t, 1) + "℃";

  // Send it to the server
  Blynk.virtualWrite(V5, str);
}
    `,
    init: `
  // Setup a function to be called every second
  timer.setInterval(1000L, sendTemperature);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "More/NeoPixel" : {
    comment : `
  Control a color gradient on NeoPixel strip using a slider!

  For this example you need NeoPixel library:
    https://github.com/adafruit/Adafruit_NeoPixel

  App dashboard setup:
    Slider widget (0...500) on V1
    `,
    inc: `
#include <Adafruit_NeoPixel.h>
    `,
    glob: `
#define PIN 8

Adafruit_NeoPixel strip = Adafruit_NeoPixel(30, PIN, NEO_GRB + NEO_KHZ800);

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  if (WheelPos < 85) {
    return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  } else if (WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  } else {
    WheelPos -= 170;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
}

BLYNK_WRITE(V1)
{
  int shift = param.asInt();
  for (int i = 0; i < strip.numPixels(); i++)
  {
    strip.setPixelColor(i, Wheel(shift & 255));
    // OR: strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + shift) & 255));
  }
  strip.show();
}
    `,
    init: `
  strip.begin();
  strip.show();
    `,
  },
  /***********************************************/
  "More/PrintAllVirtual" : {
    comment : `
  This sketch prints all virtual pin's operations!
    `,
    glob: `

// This is called for all virtual pins, that don't have BLYNK_WRITE handler
BLYNK_WRITE_DEFAULT() {
  <%= serial_dbg %>.print("input V");
  <%= serial_dbg %>.print(request.pin);
  <%= serial_dbg %>.println(":");
  // Print all parameter values
  for (auto i = param.begin(); i < param.end(); ++i) {
    <%= serial_dbg %>.print("* ");
    <%= serial_dbg %>.println(i.asString());
  }
}

// This is called for all virtual pins, that don't have BLYNK_READ handler
BLYNK_READ_DEFAULT() {
  // Generate random response
  int val = random(0, 100);
  <%= serial_dbg %>.print("output V");
  <%= serial_dbg %>.print(request.pin);
  <%= serial_dbg %>.print(": ");
  <%= serial_dbg %>.println(val);
  Blynk.virtualWrite(request.pin, val);
}

    `,
  },
  /***********************************************/
  "More/ServerAsDataStorage/ServerAsDataStorage_SingleValue" : {
    comment : `
  This example shows you how you can use server as storage for
  your data like EEPROM

  Project setup in the Blynk app (not necessary):
    Value display on V0 in PUSH mode.
    `,
    glob: `
BlynkTimer timer;
int uptimeCounter;

// This function will run every time Blynk connection is established
BLYNK_CONNECTED() {
  //get data stored in virtual pin V0 from server
  Blynk.syncVirtual(V0);
}

// restoring counter from server
BLYNK_WRITE(V0)
{
  //restoring int value
  uptimeCounter = param.asInt();
}

void increment() {
  uptimeCounter++;

  //storing int in V0 pin on server
  Blynk.virtualWrite(V0, uptimeCounter);
}
    `,
    init: `
  timer.setInterval(1000L, increment);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "More/ServerAsDataStorage/ServerAsDataStorage_MultiValue" : {
    comment : `
  This example shows you how you can use server as storage for
  your data like EEPROM

  Project setup in the Blynk app (not necessary):
    Value display on V1 in PUSH mode.
    `,
    glob: `
BlynkTimer timer;
int uptimeCounter;
String someStaticData = "SomeStaticData";

// This function will run every time Blynk connection is established
BLYNK_CONNECTED() {
  //get data stored in virtual pin V0 from server
  Blynk.syncVirtual(V0);
}

// restoring counter from server
BLYNK_WRITE(V0)
{
  //restoring int value
  uptimeCounter = param[0].asInt();
  //restoring string value
  someStaticData = param[1].asString();
}

void increment() {
  uptimeCounter++;

  //storing int and string in V0 pin on server
  Blynk.virtualWrite(V0, uptimeCounter, someStaticData);

  //updating value display with uptimeCounter
  Blynk.virtualWrite(V1, uptimeCounter);
}

    `,
    init: `
  timer.setInterval(1000L, increment);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "More/SetProperty/SetProperty_SingleValue" : {
    comment : `
  You can set predefined properties of any widget. Like color, label

  Project setup in the Blynk app:
    Gauge widget (0...100) on V0 in PUSH mode
    Slider widget (0...100) on V1
    `,
    glob: `
#define BLYNK_GREEN     "#23C48E"
#define BLYNK_BLUE      "#04C0F8"
#define BLYNK_YELLOW    "#ED9D00"
#define BLYNK_RED       "#D3435C"
#define BLYNK_DARK_BLUE "#5F7CD8"

String gaugeColor;

BLYNK_WRITE(V1) {
  int gaugeValue = param.asInt();

  String newColor;
  if (gaugeValue > 80) {
    newColor = BLYNK_RED;
  } else if (gaugeValue > 50) {
    newColor = BLYNK_YELLOW;
  } else {
    newColor = BLYNK_GREEN;
  }

  // Send only if changed
  if (newColor != gaugeColor) {
    gaugeColor = newColor;
    Blynk.setProperty(V0, "color", gaugeColor);
  }

  Blynk.virtualWrite(V0, gaugeValue);
}
    `,
  },
  /***********************************************/
  "More/SetProperty/SetProperty_MultiValue" : {
    comment : `
  You can set predefined properties of any widget. Like color, label

  Project setup in the Blynk app:
    Menu Widget on V1 with 2 items
    `,
    glob: `
BLYNK_WRITE(V1) {
  int value = param.asInt();
  if (value == 1) {
    <%= serial_dbg %>.println("Item 1 selected");
  } else if (value == 2) {
    // If item 2 is selected, change menu items...
    BlynkParamAllocated items(128); // list length, in bytes
    items.add("New item 1");
    items.add("New item 2");
    items.add("New item 3");
    Blynk.setProperty(V1, "labels", items);

    // You can also use it like this:
    //Blynk.setProperty(V1, "labels", "item 1", "item 2", "item 3");

  } else {
    <%= serial_dbg %>.println("Unknown item selected");
  }
}
    `,
  },
  /***********************************************/
  "More/Stroboscope" : {
    comment : `
  This is a simple stroboscope.
  You can turn it on and of using a button,
  and control frequency with a slider.

  App dashboard setup:
    Button widget (Switch) on V1
    Slider widget (100...1000) on V2
    `,
    glob: `
#define LED_PIN 9

BlynkTimer timer;
int t1;

// Toggle LED
void ledBlynk()
{
  digitalWrite(LED_PIN, !digitalRead(LED_PIN));
}

// Enable/disable blinking using virtual pin 1
BLYNK_WRITE(V1)
{
  if (param.asInt()) {
    timer.enable(t1);
  } else {
    timer.disable(t1);
    digitalWrite(LED_PIN, LOW);
  }
}

// Change blink interval using virtual pin 2
BLYNK_WRITE(V2)
{
  long interval = param.asLong();
  boolean wasEnabled = timer.isEnabled(t1);
  timer.deleteTimer(t1);
  t1 = timer.setInterval(interval, ledBlynk);
  if (!wasEnabled) {
    timer.disable(t1);
  }
}
    `,
    init: `
  // Configure LED and timer
  pinMode(LED_PIN, OUTPUT);
  t1 = timer.setInterval(500L, ledBlynk);
  timer.disable(t1);
    `,
    loop: `
  timer.run();
    `
  },
  /***********************************************/
  "More/Sync/ButtonPoll" : {
    comment : `
  This example shows how to monitor a button state
  using polling mechanism.

  App dashboard setup:
    LED widget on V1
    `,
    glob: `
int prevState = -1;
int currState = -1;
long lastChangeTime = 0;

void checkPin()
{
  // Invert state, since button is "Active LOW"
  int state = !digitalRead(2);

  // Debounce mechanism
  long t = millis();
  if (state != prevState) {
    lastChangeTime = t;
  }
  if (t - lastChangeTime > 50) {
    if (state != currState) {
      currState = state;
      Blynk.virtualWrite(V1, state);
    }
  }
  prevState = state;
}
    `,
    init: `
  // Make pin 2 default HIGH, and attach INT to our handler
  pinMode(2, INPUT_PULLUP);
    `,
    loop: `
  checkPin();
    `
  },
  /***********************************************/
  "More/Sync/ButtonInterrupt" : {
    comment : `
  This example shows how to monitor a button state
  using interrupts mechanism.

  App dashboard setup:
    LED widget on V1
    `,
    glob: `
WidgetLED led1(V1);

// We make these values volatile, as they are used in interrupt context
volatile bool pinChanged = false;
volatile int  pinValue   = 0;

// Most boards won't send data to WiFi out of interrupt handler.
// We just store the value and process it in the main loop.
void checkPin()
{
  // Invert state, since button is "Active LOW"
  pinValue = !digitalRead(2);

  // Mark pin value changed
  pinChanged = true;
}
    `,
    init: `
  // Make pin 2 HIGH by default
  pinMode(2, INPUT_PULLUP);
  // Attach INT to our handler
  attachInterrupt(digitalPinToInterrupt(2), checkPin, CHANGE);
    `,
    loop: `

  if (pinChanged) {

    // Process the value
    if (pinValue) {
      led1.on();
    } else {
      led1.off();
    }

    // Clear the mark, as we have processed the value
    pinChanged = false;
  }
    `
  },
  /***********************************************/
  "More/Sync/HardwareSyncStateFromApp" : {
    comment : `
  You can synchronize the state of widgets with hardware states,
  even if hardware resets or looses connection temporarily

  Project setup in the Blynk app:
    Slider widget (0...1024) on V0
    Value display (0...1024) on V2
    Button widget on digital pin (connected to an LED)
    `,
    glob: `

// This function will run every time Blynk connection is established
BLYNK_CONNECTED() {
  // Request Blynk server to re-send latest values for all pins
  Blynk.syncAll();

  // You can also update individual virtual pins like this:
  //Blynk.syncVirtual(V0, V2);

  // Let's write your hardware uptime to Virtual Pin 2
  int value = millis() / 1000;
  Blynk.virtualWrite(V2, value);
}

BLYNK_WRITE(V0)
{
  // Use of syncAll() will cause this function to be called
  // Parameter holds last slider value
  int sliderValue0 = param.asInt();
}

BLYNK_WRITE(V2)
{
  // You'll get uptime value here as result of syncAll()
  int uptime = param.asInt();
}
    `,
  },
  /***********************************************/
  "More/Sync/SyncPhysicalButton" : {
    comment : `
  This example shows how to synchronize Button widget
  and physical button state.

  App dashboard setup:
    Button widget attached to V2 (Switch mode)
    `,
    glob: `
// Set your LED and physical button pins here
const int ledPin = 7;
const int btnPin = 8;

BlynkTimer timer;
void checkPhysicalButton();

int ledState = LOW;
int btnState = HIGH;

// Every time we connect to the cloud...
BLYNK_CONNECTED() {
  // Request the latest state from the server
  Blynk.syncVirtual(V2);

  // Alternatively, you could override server state using:
  //Blynk.virtualWrite(V2, ledState);
}

// When App button is pushed - switch the state
BLYNK_WRITE(V2) {
  ledState = param.asInt();
  digitalWrite(ledPin, ledState);
}

void checkPhysicalButton()
{
  if (digitalRead(btnPin) == LOW) {
    // btnState is used to avoid sequential toggles
    if (btnState != LOW) {

      // Toggle LED state
      ledState = !ledState;
      digitalWrite(ledPin, ledState);

      // Update Button Widget
      Blynk.virtualWrite(V2, ledState);
    }
    btnState = LOW;
  } else {
    btnState = HIGH;
  }
}
    `,
    init: `
  pinMode(ledPin, OUTPUT);
  pinMode(btnPin, INPUT_PULLUP);
  digitalWrite(ledPin, ledState);

  // Setup a function to be called every 100 ms
  timer.setInterval(100L, checkPhysicalButton);
    `,
    loop: `
  timer.run();
    `
  }

};

module.exports = examples;
