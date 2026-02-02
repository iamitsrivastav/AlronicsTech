# Obstacle Avoidance Robot: Complete Project Guide

## 📚 Quick Reference
- **Level:** Beginner to Intermediate
- **Time:** 2-3 hours (build + coding)
- **Cost:** ~$50-100 USD
- **Language:** Python
- **Platform:** Raspberry Pi or Arduino

---

## 1. Project Overview

### What is an Obstacle Avoidance Robot?

An **obstacle avoidance robot** is a robot that can move around independently and detect objects or obstacles in its path. When it encounters an obstacle, the robot automatically turns away and continues moving forward.

Think of it like a robot with "eyes" (sensors) that help it see where it's going!

### Real-Life Example
- 🤖 **Robotic Vacuum Cleaners** – They move around your home and stop when they detect walls or furniture
- 🚗 **Self-Driving Cars** – They use similar sensors to detect obstacles on the road
- 🛸 **Planetary Rovers** – NASA rovers on Mars use obstacle detection to navigate rocky terrain

### Why Build This Project?

By building an obstacle avoidance robot, you will learn:
- ✅ How to use **ultrasonic sensors** to detect distance
- ✅ How to control **motors** with a microcontroller
- ✅ **Logic programming** (if-else conditions)
- ✅ Real-time **sensor data processing**
- ✅ Basic **electronics** and circuit design

---

## 2. Learning Outcomes

By the end of this project, you will understand:

### 🧠 Core Concepts
- **Ultrasonic Sensors** – How sound waves measure distance
- **PWM (Pulse Width Modulation)** – How to control motor speed
- **GPIO Pins** – How to communicate with hardware
- **Logic & Conditions** – How to make decisions based on sensor data

### ⚙️ Practical Skills
- Wiring electronic circuits safely
- Writing and debugging Python code
- Troubleshooting sensor issues
- Testing and optimizing robot behavior

### 💻 Programming Skills
- Using libraries for GPIO control
- Reading sensor values in real-time
- Controlling motors based on conditions
- Creating reusable functions

### 🔧 Hardware Skills
- Soldering (optional)
- Using breadboards
- Understanding voltage and current
- Proper power management

---

## 3. Components List

### 🔌 Hardware Components

| Component | Qty | Specifications | Where to Buy |
|-----------|-----|-----------------|-------------|
| **Raspberry Pi** or **Arduino** | 1 | Raspberry Pi 4 / Arduino Uno | Amazon, Adafruit |
| **Ultrasonic Sensor** | 1 | HC-SR04 or similar | Amazon, eBay |
| **DC Motor** | 2 | 3-6V with gearbox | Robot kit suppliers |
| **Motor Driver Module** | 1 | L298N or DRV8833 | Amazon, AliExpress |
| **Robot Chassis** | 1 | 2-wheel or 4-wheel | Robot kit or DIY |
| **Wheels** | 2-4 | Rubber wheels | Included in chassis |
| **Servo Motor** | 1 | 9g or 180° range | Optional (for sensor mount) |
| **Battery Pack** | 1 | 4x AA or USB power bank | Local electronics store |
| **Jumper Wires** | 20+ | M-M, M-F, F-F | Amazon, Electronics store |
| **Breadboard** | 1 | 400-hole mini breadboard | Amazon |
| **Power Bank** | 1 | 5V for Raspberry Pi | Any electronics store |

### 💻 Software & Tools

| Software | Purpose | Download |
|----------|---------|----------|
| **Python 3.x** | Programming language | python.org |
| **RPi.GPIO** or **PyFirmata** | GPIO library | pip install |
| **Thonny IDE** | Code editor (optional) | thonny.org |
| **Fritzing** | Circuit diagram tool | fritzing.org |

### 📋 Optional Add-ons

- **LED Lights** – Add visual feedback (movement indicators)
- **Buzzer** – Audio alerts when obstacle detected
- **Camera Module** – Add computer vision
- **OLED Display** – Show distance values

---

## 4. Circuit Diagram & Explanation

### 🔌 Connection Overview

```
[Ultrasonic Sensor] → Raspberry Pi GPIO pins
                ↓
[Sensor reads distance]
                ↓
[Motor Driver] ← Receives control signal
                ↓
[DC Motors] ← Turns left/right/forward
```

### Understanding the Circuit

#### 🔋 Power Supply
- **Battery Pack (5-6V)** powers the motors
- **Raspberry Pi Power Bank (5V USB)** powers the logic board
- **Always keep power supplies separate** for motors and microcontroller

**Why?** Motors draw lots of current and can damage your Raspberry Pi if connected directly!

#### 📡 Ultrasonic Sensor (HC-SR04)
The HC-SR04 sensor works like **radar**:

1. **Trigger Pin** – We send a short electrical pulse (10 microseconds)
2. **Sound Wave Emitted** – The sensor sends ultrasonic sound (40 kHz frequency)
3. **Sound Bounces** – Sound hits an object and bounces back
4. **Echo Pin Receives** – The sensor receives the returning sound
5. **Distance Calculated** – Microcontroller measures the time delay

**Formula:**
```
Distance = (Time × Speed of Sound) ÷ 2
Distance = (Time × 34,300 cm/s) ÷ 2
```

**Example:** If time = 100 microseconds, then distance ≈ 1.7 cm

#### ⚡ Motor Control with L298N Driver

The L298N is a **motor driver** – a bridge between your sensor logic and motors:

| Pin | Purpose |
|-----|---------|
| **IN1, IN2** | Motor A direction control |
| **IN3, IN4** | Motor B direction control |
| **OUT1, OUT2** | Connects to Motor A |
| **OUT3, OUT4** | Connects to Motor B |
| **+5V, GND** | Logic power (from Pi) |
| **+12V, GND** | Motor power (from battery) |

**How it works:**
- When IN1 = HIGH, IN2 = LOW → Motor spins forward
- When IN1 = LOW, IN2 = HIGH → Motor spins backward
- When both HIGH or both LOW → Motor stops

### 📋 Wiring Checklist

```
ULTRASONIC SENSOR:
□ VCC → Raspberry Pi 5V
□ GND → Raspberry Pi GND
□ TRIG → GPIO17 (Trigger pin)
□ ECHO → GPIO27 (Echo pin, with voltage divider)

MOTOR DRIVER (L298N):
□ IN1 → GPIO22
□ IN2 → GPIO23
□ IN3 → GPIO24
□ IN4 → GPIO25
□ +5V → Raspberry Pi 5V
□ GND → Raspberry Pi GND (same as battery GND)
□ +12V → Battery positive
□ GND → Battery negative

DC MOTORS:
□ Motor A → OUT1, OUT2
□ Motor B → OUT3, OUT4
```

### ⚠️ Important Safety Notes

1. **Voltage Divider Required!**
   - Ultrasonic sensor ECHO pin outputs 5V
   - Raspberry Pi GPIO can only handle 3.3V
   - Use a voltage divider: 1kΩ + 2kΩ resistors
   
   ```
   ECHO (5V) ──[1kΩ]──┬──── GPIO27 (3.3V)
                      │
                    [2kΩ]
                      │
                      └──── GND
   ```

2. **Ground All Components!**
   - All grounds (Pi, battery, motor driver) must be connected together
   - This creates a common reference point for electrical signals

3. **Power Off Before Wiring**
   - Always disconnect power before making circuit changes
   - Double-check all connections before powering on

---

## 5. Code Explanation

### 📦 Python Libraries Used

```python
import RPi.GPIO as GPIO           # Control GPIO pins
import time                        # Measure time delays
import math                        # Math calculations
```

### 🎯 Complete Code with Comments

```python
#!/usr/bin/env python3
"""
Obstacle Avoidance Robot
Author: Alronics Tech
Description: A robot that detects obstacles using an ultrasonic sensor 
             and automatically avoids them by turning.
"""

import RPi.GPIO as GPIO
import time
import signal

# ===== GPIO Setup =====
GPIO.setmode(GPIO.BCM)           # Use Broadcom pin numbering
GPIO.setwarnings(False)           # Suppress warnings

# Ultrasonic Sensor Pins
TRIGGER = 17                      # GPIO17 sends the pulse
ECHO = 27                         # GPIO27 receives the echo

# Motor Control Pins (L298N Motor Driver)
MOTOR_A_IN1 = 22                  # Motor A - Forward
MOTOR_A_IN2 = 23                  # Motor A - Backward
MOTOR_B_IN1 = 24                  # Motor B - Forward
MOTOR_B_IN2 = 25                  # Motor B - Backward

# Setup all pins as outputs
for pin in [TRIGGER, MOTOR_A_IN1, MOTOR_A_IN2, MOTOR_B_IN1, MOTOR_B_IN2]:
    GPIO.setup(pin, GPIO.OUT)

# Setup echo pin as input
GPIO.setup(ECHO, GPIO.IN)

# ===== Distance Measurement Function =====
def measure_distance():
    """
    Measures distance using ultrasonic sensor.
    Returns: distance in centimeters (float)
    """
    # Send a 10 microsecond pulse to trigger the sensor
    GPIO.output(TRIGGER, GPIO.HIGH)
    time.sleep(0.00001)                    # 10 microseconds
    GPIO.output(TRIGGER, GPIO.LOW)
    
    # Wait for the echo to start
    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()
    
    # Wait for the echo to end
    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()
    
    # Calculate distance using the formula:
    # Distance = Speed of Sound × Time / 2
    # Speed of sound = 34300 cm/s
    pulse_duration = pulse_end - pulse_start
    distance = (pulse_duration * 34300) / 2
    
    return distance

# ===== Motor Control Functions =====
def move_forward(duration=1):
    """
    Move the robot forward.
    duration: how long to move (in seconds)
    """
    print("Moving forward...")
    GPIO.output(MOTOR_A_IN1, GPIO.HIGH)   # Motor A forward
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.HIGH)   # Motor B forward
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)
    time.sleep(duration)

def turn_right(duration=0.5):
    """
    Turn the robot to the right.
    Stops left motor, continues right motor forward.
    """
    print("Turning right...")
    GPIO.output(MOTOR_A_IN1, GPIO.LOW)    # Motor A stop
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.HIGH)   # Motor B forward
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)
    time.sleep(duration)

def turn_left(duration=0.5):
    """
    Turn the robot to the left.
    Stops right motor, continues left motor forward.
    """
    print("Turning left...")
    GPIO.output(MOTOR_A_IN1, GPIO.HIGH)   # Motor A forward
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.LOW)    # Motor B stop
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)
    time.sleep(duration)

def stop():
    """
    Stop the robot immediately.
    """
    print("Stopping...")
    GPIO.output(MOTOR_A_IN1, GPIO.LOW)
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.LOW)
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)

# ===== Main Obstacle Avoidance Logic =====
def obstacle_avoidance():
    """
    Main function that implements obstacle avoidance logic.
    The robot continuously:
    1. Measures distance
    2. If obstacle detected (< 20cm) → Turn
    3. If no obstacle → Move forward
    """
    try:
        print("🤖 Obstacle Avoidance Robot Started!")
        print("Press Ctrl+C to stop...")
        time.sleep(2)
        
        while True:
            # Measure distance
            distance = measure_distance()
            print(f"Distance: {distance:.1f} cm")
            
            # Obstacle avoidance logic
            if distance < 20:
                # Obstacle detected! Stop and turn right
                stop()
                time.sleep(0.5)
                turn_right(0.6)
            else:
                # No obstacle, move forward
                move_forward(0.2)
    
    except KeyboardInterrupt:
        print("\n🛑 Robot stopped by user!")
    finally:
        stop()
        GPIO.cleanup()  # Reset all GPIO pins

# ===== Run the Program =====
if __name__ == "__main__":
    obstacle_avoidance()
```

### 🔍 Code Breakdown

#### 1. **GPIO Setup**
```python
GPIO.setmode(GPIO.BCM)  # Use chip's internal pin numbers
```
Each pin on Raspberry Pi has two names:
- **BCM (Broadcom)** – Internal chip numbers (17, 27, 22, etc.)
- **BOARD** – Physical pin positions (1-40)

We use BCM because it's more portable.

#### 2. **Distance Measurement Function**
```python
def measure_distance():
    GPIO.output(TRIGGER, GPIO.HIGH)      # Send pulse
    time.sleep(0.00001)                  # Wait 10 microseconds
    GPIO.output(TRIGGER, GPIO.LOW)       # Stop pulse
```

This sends a "ping" to the sensor, then waits for the echo.

#### 3. **Motor Control Functions**
```python
def move_forward(duration=1):
    GPIO.output(MOTOR_A_IN1, GPIO.HIGH)  # Set IN1 HIGH
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)   # Set IN2 LOW
```

When IN1 is HIGH and IN2 is LOW, the motor spins forward!

#### 4. **Obstacle Detection Logic**
```python
if distance < 20:          # If object closer than 20cm
    stop()                 # Stop moving
    turn_right(0.6)        # Turn right for 0.6 seconds
else:
    move_forward(0.2)      # Keep moving forward
```

The "20 cm" threshold is **tunable** – try different values!

---

## 6. Video Tutorial

[YouTube video would be embedded here with step-by-step assembly and testing]

### 📺 What the Video Shows
- Component layout and identification
- Soldering connections (if applicable)
- Wiring the circuit step-by-step
- Testing the ultrasonic sensor
- Testing the motors
- Uploading and running the code
- Troubleshooting common issues

---

## 7. Troubleshooting & Common Errors

### ❌ **Robot won't move**

**Possible Causes:**
1. Motors not receiving power
2. Motor wires loose
3. Battery dead
4. GPIO pins set incorrectly

**Solutions:**
1. Check battery voltage with a multimeter
2. Test motors directly with battery (no Pi) – they should spin
3. Check if motor driver is getting 5V logic power
4. Verify GPIO pin numbers match your code

### ❌ **Distance sensor shows wrong values (e.g., always 0 or 999)**

**Possible Causes:**
1. Sensor not wired correctly
2. ECHO pin not receiving signal
3. Voltage divider missing (sensor outputting 5V to 3.3V GPIO)
4. Sensor facing wrong direction

**Solutions:**
1. Test with LED: temporarily connect LED to ECHO pin
   - If LED blinks, sensor is working
2. Add a **voltage divider** (see circuit section)
3. Rotate sensor to face forward
4. Run this test code:
```python
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
TRIGGER = 17
ECHO = 27

GPIO.setup(TRIGGER, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)

for i in range(5):
    GPIO.output(TRIGGER, GPIO.HIGH)
    time.sleep(0.00001)
    GPIO.output(TRIGGER, GPIO.LOW)
    
    start = time.time()
    while GPIO.input(ECHO) == 0:
        start = time.time()
    while GPIO.input(ECHO) == 1:
        end = time.time()
    
    distance = (end - start) * 34300 / 2
    print(f"Distance: {distance:.1f} cm")
    time.sleep(0.5)

GPIO.cleanup()
```

### ❌ **Robot spins in circles instead of moving straight**

**Possible Causes:**
1. Motors have different speeds
2. Wheels are loose or uneven
3. Robot chassis is unbalanced

**Solutions:**
1. Adjust motor speeds using PWM (Pulse Width Modulation)
2. Tighten wheels and check for bent axles
3. Add weights to balance the chassis
4. You can modify the code to control speed:
```python
# Advanced: Speed control using PWM
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
MOTOR_A_IN1 = 22
MOTOR_A_PWM = GPIO.PWM(MOTOR_A_IN1, 1000)  # 1000 Hz frequency
MOTOR_A_PWM.start(75)  # Start at 75% speed
```

### ❌ **Robot stops randomly or moves erratically**

**Possible Causes:**
1. Loose wiring connections
2. Power supply fluctuating
3. Ground connection problems
4. Interference from other devices

**Solutions:**
1. Check all wire connections are firm
2. Test with fresh batteries
3. **Make sure all grounds are connected** – this is crucial!
4. Try running the robot away from Wi-Fi routers or microwaves

### 💡 **General Debugging Tips**

**1. Use print() to see what's happening:**
```python
distance = measure_distance()
print(f"DEBUG: Distance = {distance} cm")
print(f"DEBUG: ECHO pin reading = {GPIO.input(ECHO)}")
```

**2. Add delays between commands:**
```python
move_forward(0.2)
time.sleep(0.1)  # Add pause between commands
```

**3. Start simple, then add complexity:**
- First: Just test the sensor
- Second: Test motors separately
- Third: Combine sensor + motor logic

**4. Check pin numbers match your setup:**
```python
print(f"Using pins: TRIGGER={TRIGGER}, ECHO={ECHO}")
print(f"Motor pins: A1={MOTOR_A_IN1}, A2={MOTOR_A_IN2}")
```

---

## 8. Extension Ideas

### 🚀 **Extension 1: Speed Control with PWM**
**Level: Intermediate**

Make the robot move at different speeds based on how close the obstacle is. If an obstacle is very close (e.g., 10 cm), move slowly. If it's far away (30 cm), move fast.

```python
# Pseudo-code
distance = measure_distance()
if distance < 15:
    speed = 30  # 30% speed (slow)
elif distance < 25:
    speed = 60  # 60% speed (medium)
else:
    speed = 100  # 100% speed (fast)
```

### 🔄 **Extension 2: 360° Scanning Servo**
**Level: Intermediate**

Add a servo motor to mount the ultrasonic sensor. Make it scan left and right to find the best path before deciding which way to turn.

```python
# Scan the area before deciding
left_distance = scan_left()
right_distance = scan_right()
center_distance = scan_center()

if left_distance > right_distance:
    turn_left()  # Choose better path
else:
    turn_right()
```

### 📊 **Extension 3: Data Logging**
**Level: Intermediate**

Record all sensor data (distance, timestamp, direction) to a CSV file. Later, analyze the data or visualize it in a graph.

```python
import csv

with open('robot_log.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(['Time', 'Distance', 'Action'])
    
    while running:
        distance = measure_distance()
        writer.writerow([time.time(), distance, 'moving_forward'])
```

### 🌐 **Extension 4: Web Dashboard**
**Level: Advanced**

Send sensor data to a web server. Control the robot and view live distance readings from a web browser!

```python
# Send data to web server
import requests

data = {'distance': distance, 'status': 'moving'}
requests.post('http://yourserver.com/api/robot', json=data)
```

### 🎮 **Extension 5: Remote Control**
**Level: Advanced**

Add an IR receiver to control the robot with a remote control. Or use Bluetooth to control it from your phone!

### 🤖 **Extension 6: Multiple Sensors**
**Level: Advanced**

Add 3 ultrasonic sensors (front, left, right) for better obstacle detection. The robot can then choose the best direction to move.

---

## 9. Downloads & Resources

### 📥 Available Files
- **Complete Python Code** – Copy-paste ready
- **Circuit Diagram (PNG)** – For reference
- **Components List (CSV)** – Shopping guide
- **Quick Start Guide (PDF)** – Print and follow

### 🔗 External Resources

**Component Datasheets:**
- [HC-SR04 Ultrasonic Sensor Datasheet](https://cdn.shopify.com/s/files/1/0652/5902/6891/files/HC-SR04.pdf)
- [L298N Motor Driver Datasheet](http://www.handsontec.com/datasheets/L298N.pdf)
- [Raspberry Pi GPIO Pinout](https://pinout.xyz/)

**Useful Websites:**
- [Raspberry Pi Official Documentation](https://www.raspberrypi.org/documentation/)
- [CircuitPython GPIO Library](https://circuitpython.readthedocs.io/)
- [Arduino Obstacle Avoidance](https://www.arduino.cc/) (if using Arduino instead)

**Online Tutorials:**
- [RPi.GPIO Tutorial](https://sourceforge.net/p/raspberry-gpio-python/wiki/Home/)
- [Motor Control Basics](https://learn.adafruit.com/adafruit-guide-excellent-soldering/making-good-solder-joints)

---

## 10. FAQ

### **Q: Can I use Arduino instead of Raspberry Pi?**
**A:** Yes! The concepts are the same. You'll use Arduino IDE instead of Python, and the wiring is slightly different. Arduino code would use `digitalWrite()` and `analogRead()` instead of GPIO.

### **Q: What if I don't have a servo motor?**
**A:** Not necessary for the basic project! The simple turning logic works great. Servo is only needed for scanning extensions.

### **Q: How far can the HC-SR04 sensor detect?**
**A:** Maximum range is about 4 meters (400 cm). For obstacle avoidance, 20-30 cm is a good working range.

### **Q: Can I use different motors?**
**A:** Yes, as long as they're:
- DC motors rated for 3-6V
- Draw less than 1A each
- Not too heavy for your chassis

### **Q: What if my sensor is giving inconsistent readings?**
**A:** This is normal! Ultrasonic sensors can be affected by:
- Temperature changes
- Soft materials that absorb sound
- Curved obstacles

Try averaging multiple readings:
```python
readings = [measure_distance() for _ in range(5)]
average_distance = sum(readings) / len(readings)
```

### **Q: How long should the robot run on batteries?**
**A:** Typically 1-3 hours depending on:
- Battery capacity
- Motor speed
- Efficiency of components

### **Q: Can the robot work outdoors?**
**A:** Not recommended! Ultrasonic sensors:
- Are affected by wind
- Can be interfered by other sensors
- Work best indoors at room temperature

---

## 11. What's Next?

After mastering obstacle avoidance, try these advanced projects:

1. **Line Following Robot** – Follow a black/white line using light sensors
2. **WiFi-Controlled Robot** – Control via web interface
3. **Maze Solver Robot** – Navigate through a maze autonomously
4. **Object Recognition Robot** – Use camera to identify objects
5. **Swarm Robotics** – Multiple robots working together

---

## 12. Share Your Project!

Built this robot? **We'd love to see it!**

📸 **Share on Social Media:**
- Tag us: @AlronicsTech
- Use hashtag: #AlronicsTechRobot
- Post videos of your obstacle avoidance in action!

📧 **Contact Us:**
- Email: [contact info]
- YouTube: [channel link]
- GitHub: [repository link]

---

## 📝 Notes for Teachers & Parents

This project is designed for **students aged 10-18** with:
- **Beginner** can follow this with guidance
- **Intermediate** can do this independently
- **Advanced** can extend with the modification ideas

**Learning Standards Met:**
- STEM Education Objectives
- Problem-Solving Skills
- Electronics & Circuits
- Programming Logic
- Troubleshooting Methodology

**Safety Reminders:**
- Always supervise soldering
- Teach proper power handling
- Emphasize importance of grounding
- Never power motors directly from Pi GPIO

---

**Happy Building! 🤖🎉**

*Last Updated: February 2, 2026*
*For latest updates, subscribe to Alronics Tech on YouTube*
