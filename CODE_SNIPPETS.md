# Code Snippets & Examples

Quick reference for common tasks on Alronics Tech website.

---

## 🔗 Linking to Blog Posts

### From Homepage
```html
<!-- Featured project card -->
<a href="/blog/robotics/obstacle.html" class="card-hover">
  <h3 class="text-xl font-bold mb-3">Obstacle Avoidance Robot</h3>
  <p class="text-gray-600 mb-4">Learn obstacle detection with ultrasonic sensors.</p>
</a>

<!-- Category card with arrow -->
<a href="/blog/robotics/obstacle.html" class="category-card group">
  <div class="text-4xl mb-4">🤖</div>
  <h3 class="text-2xl font-bold mb-2">Robotics Projects</h3>
  <p class="text-gray-700">Learn robotics fundamentals...</p>
  <span class="text-blue-600 font-medium group-hover:underline">Explore →</span>
</a>
```

### From Another Blog Post
```html
<!-- Related project -->
<a href="/blog/robotics/line-following.html" class="card-hover">
  <h3 class="text-xl font-bold mb-2">Line Following Robot</h3>
  <p class="text-gray-600 text-sm">Build a robot that follows black lines...</p>
</a>

<!-- Previous/Next navigation -->
<a href="/blog/robotics/obstacle.html" class="group">
  <span class="text-sm text-gray-600">← Previous Project</span>
  <h3 class="text-lg font-bold hover-text-accent">Obstacle Avoidance</h3>
</a>
```

---

## 📝 Common HTML Snippets

### Alert/Info Box
```html
<!-- Blue info box -->
<div class="tile-neutral border-l-4 border-accent rounded-lg p-6">
  <h3 class="font-bold text-lg mb-4">💡 Pro Tip</h3>
  <p class="text-gray-700">Your tip or important information here</p>
</div>

<!-- Yellow warning box -->
<div class="tile-neutral border-l-4 border-accent rounded-lg p-6">
  <h3 class="font-bold text-lg mb-4">⚠️ Warning</h3>
  <p class="text-gray-700">Your warning here</p>
</div>

<!-- Green success box -->
<div class="tile-neutral border-l-4 border-accent rounded-lg p-6">
  <h3 class="font-bold text-lg mb-4">✅ Success</h3>
  <p class="text-gray-700">Your success message here</p>
</div>
```

### Feature List
```html
<ul class="space-y-3">
  <li class="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
    <span class="text-blue-600 font-bold">✓</span>
    <span><strong>Feature Name:</strong> Feature description</span>
  </li>
  <li class="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
    <span class="text-blue-600 font-bold">✓</span>
    <span><strong>Feature Name:</strong> Feature description</span>
  </li>
  <li class="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
    <span class="text-blue-600 font-bold">✓</span>
    <span><strong>Feature Name:</strong> Feature description</span>
  </li>
</ul>
```

### Collapsible Section (Q&A)
```html
<details class="bg-gray-50 rounded-lg border border-gray-300">
  <summary class="px-6 py-4 font-bold cursor-pointer hover:bg-gray-100">
    ❓ Question: How do I...?
  </summary>
  <div class="px-6 pb-4 text-gray-700">
    <p class="mb-3">Your answer here.</p>
    <p>More information if needed.</p>
  </div>
</details>
```

### Button Styles
```html
<!-- Primary button (blue) -->
<button class="btn-primary">Click Me</button>

<!-- Secondary button (outline) -->
<button class="btn-secondary text-blue-600">Click Me</button>

<!-- As link -->
<a href="/" class="btn-primary">Go Home</a>
<a href="/" class="btn-secondary text-blue-600">Go Home</a>

<!-- Full width -->
<button class="btn-primary w-full">Full Width Button</button>

<!-- Different colors -->
<button class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
  Red Button
</button>
```

### Code Block with Copy Button
```html
<div class="relative">
  <pre class="code-block"><code class="language-python">
# Your code here
print("Hello, World!")
  </code></pre>
  <button class="code-copy-btn" onclick="copyCode(event)">
    📋 Copy Code
  </button>
</div>
```

### Images with Alt Text
```html
<!-- With caption -->
<figure>
  <img src="/assets/images/circuit.png" 
       alt="Circuit diagram for obstacle avoidance robot"
       width="1200" height="800" loading="lazy">
  <figcaption class="text-sm text-gray-600 mt-4">
    <strong>Figure 1:</strong> Complete circuit showing all connections
  </figcaption>
</figure>

<!-- Simple -->
<img src="/assets/images/robot.jpg" 
     alt="Obstacle avoidance robot with ultrasonic sensor"
     class="rounded-lg w-full">
```

### Video Embed
```html
<!-- YouTube video -->
<div class="bg-black rounded-lg overflow-hidden mb-6 aspect-video">
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
    title="Project Title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="w-full h-full">
  </iframe>
</div>
```

### Two Column Layout
```html
<div class="grid md:grid-cols-2 gap-6">
  <!-- Left column -->
  <div>
    <h3 class="text-2xl font-bold mb-4">Left Side</h3>
    <p>Content here...</p>
  </div>
  
  <!-- Right column -->
  <div>
    <h3 class="text-2xl font-bold mb-4">Right Side</h3>
    <p>Content here...</p>
  </div>
</div>
```

### Three Column Grid
```html
<div class="grid md:grid-cols-3 gap-6">
  <div class="card-hover">Column 1</div>
  <div class="card-hover">Column 2</div>
  <div class="card-hover">Column 3</div>
</div>
```

---

## 💻 Python Code Snippets

### Template with Comments
```python
#!/usr/bin/env python3
"""
Project Name
Author: Alronics Tech
Description: What this code does
"""

import RPi.GPIO as GPIO
import time

# ===== GPIO Setup =====
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Define pins
PIN_SENSOR = 17
PIN_MOTOR = 22

GPIO.setup(PIN_SENSOR, GPIO.IN)
GPIO.setup(PIN_MOTOR, GPIO.OUT)

# ===== Functions =====
def read_sensor():
    """Read sensor value and return result"""
    return GPIO.input(PIN_SENSOR)

def activate_motor():
    """Turn motor on"""
    GPIO.output(PIN_MOTOR, GPIO.HIGH)

def deactivate_motor():
    """Turn motor off"""
    GPIO.output(PIN_MOTOR, GPIO.LOW)

# ===== Main Program =====
try:
    print("Program started")
    while True:
        sensor_value = read_sensor()
        print(f"Sensor: {sensor_value}")
        
        if sensor_value == 1:
            activate_motor()
        else:
            deactivate_motor()
        
        time.sleep(0.1)

except KeyboardInterrupt:
    print("\nProgram stopped by user")
finally:
    deactivate_motor()
    GPIO.cleanup()
```

### Distance Measurement (Ultrasonic)
```python
def measure_distance():
    """Measure distance using ultrasonic sensor"""
    # Send trigger pulse
    GPIO.output(TRIGGER, GPIO.HIGH)
    time.sleep(0.00001)  # 10 microseconds
    GPIO.output(TRIGGER, GPIO.LOW)
    
    # Wait for echo start
    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()
    
    # Wait for echo end
    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()
    
    # Calculate distance
    pulse_duration = pulse_end - pulse_start
    distance = (pulse_duration * 34300) / 2  # Speed of sound = 34300 cm/s
    
    return distance

# Usage
distance = measure_distance()
print(f"Distance: {distance:.1f} cm")
```

### Motor Control (2 DC Motors)
```python
# ===== Motor Control =====
def move_forward(duration=1):
    """Move forward"""
    GPIO.output(MOTOR_A_IN1, GPIO.HIGH)
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.HIGH)
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)
    time.sleep(duration)

def turn_right(duration=0.5):
    """Turn right (right motor stops)"""
    GPIO.output(MOTOR_A_IN1, GPIO.LOW)
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.HIGH)
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)
    time.sleep(duration)

def turn_left(duration=0.5):
    """Turn left (left motor stops)"""
    GPIO.output(MOTOR_A_IN1, GPIO.HIGH)
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.LOW)
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)
    time.sleep(duration)

def stop():
    """Stop motors"""
    GPIO.output(MOTOR_A_IN1, GPIO.LOW)
    GPIO.output(MOTOR_A_IN2, GPIO.LOW)
    GPIO.output(MOTOR_B_IN1, GPIO.LOW)
    GPIO.output(MOTOR_B_IN2, GPIO.LOW)
```

### PWM Speed Control
```python
# Setup PWM
FREQUENCY = 1000  # 1000 Hz
motor_pwm = GPIO.PWM(MOTOR_A_IN1, FREQUENCY)

# Start at 75% speed
motor_pwm.start(75)

# Change speed
motor_pwm.ChangeDutyCycle(50)  # 50% speed

# Stop
motor_pwm.stop()
```

---

## 🎨 Tailwind CSS Common Classes

### Text Sizes
```html
<p class="text-xs">Extra small text</p>      <!-- 12px -->
<p class="text-sm">Small text</p>            <!-- 14px -->
<p class="text-base">Base text</p>           <!-- 16px -->
<p class="text-lg">Large text</p>            <!-- 18px -->
<p class="text-xl">Extra large</p>           <!-- 20px -->
<h3 class="text-2xl">Heading 3</h3>         <!-- 24px -->
<h2 class="text-3xl">Heading 2</h2>         <!-- 30px -->
<h1 class="text-4xl">Heading 1</h1>         <!-- 36px -->
```

### Text Styling
```html
<p class="font-bold">Bold text</p>
<p class="font-semibold">Semi-bold</p>
<p class="italic">Italic text</p>
<p class="underline">Underlined</p>
<p class="line-through">Strikethrough</p>
<p class="uppercase">uppercase</p>
<p class="lowercase">LOWERCASE</p>
```

### Colors
```html
<!-- Text colors -->
<p class="text-gray-600">Gray text</p>
<p class="text-blue-600">Blue text</p>
<p class="text-red-600">Red text</p>

<!-- Background colors -->
<div class="bg-gray-50">Light gray background</div>
<div class="bg-blue-100">Light blue background</div>
<div class="bg-blue-600">Blue background</div>

<!-- Borders -->
<div class="border border-gray-300">Gray border</div>
<div class="border-l-4 border-blue-600">Left blue border</div>
```

### Spacing
```html
<!-- Padding -->
<div class="p-4">Padding all sides (16px)</div>
<div class="px-6 py-3">Horizontal 24px, Vertical 12px</div>
<div class="pt-4 pb-8">Top 16px, Bottom 32px</div>

<!-- Margin -->
<div class="m-4">Margin all sides</div>
<div class="mt-6">Margin top 24px</div>

<!-- Gap (in grids/flex) -->
<div class="flex gap-4"><!-- 16px gap between items --></div>
<div class="grid gap-6"><!-- 24px gap between items --></div>
```

### Responsive (Mobile First!)
```html
<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Hide on mobile, show on tablet+ -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on tablet+ -->
<div class="md:hidden">Mobile only</div>
```

### Hover Effects
```html
<button class="bg-blue-600 hover:bg-blue-700">Button</button>
<a href="/" class="text-blue-600 hover:text-blue-800 hover:underline">Link</a>
<div class="p-4 hover:shadow-lg hover:scale-105 transition-all">Card</div>
```

### Rounded Corners
```html
<div class="rounded">4px corners</div>
<div class="rounded-lg">8px corners</div>
<div class="rounded-full">Circle</div>
```

### Shadows
```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-2xl">Extra large shadow</div>
```

---

## 📊 Table Example
```html
<div class="overflow-x-auto">
  <table class="w-full border border-gray-300">
    <!-- Header -->
    <thead class="bg-gray-100">
      <tr>
        <th class="border border-gray-300 px-4 py-2 text-left font-bold">
          Component
        </th>
        <th class="border border-gray-300 px-4 py-2 text-center font-bold">
          Qty
        </th>
        <th class="border border-gray-300 px-4 py-2 text-left font-bold">
          Specs
        </th>
      </tr>
    </thead>
    
    <!-- Body -->
    <tbody>
      <tr class="hover:bg-gray-50">
        <td class="border border-gray-300 px-4 py-2">Arduino Uno</td>
        <td class="border border-gray-300 px-4 py-2 text-center">1</td>
        <td class="border border-gray-300 px-4 py-2">8-bit microcontroller</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="border border-gray-300 px-4 py-2">HC-SR04 Sensor</td>
        <td class="border border-gray-300 px-4 py-2 text-center">1</td>
        <td class="border border-gray-300 px-4 py-2">Ultrasonic distance</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 🔍 Meta Tags Template
```html
<!-- SEO Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Brief description (155-160 chars)">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta name="author" content="Alronics Tech">
<meta name="theme-color" content="#00203F">

<!-- Open Graph (Social Media) -->
<meta property="og:type" content="article">
<meta property="og:title" content="Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="/assets/images/image.png">
<meta property="og:url" content="https://yourdomain.com/page">

<!-- Other -->
<meta name="robots" content="index, follow">
<meta property="article:published_time" content="2026-02-03">
<meta property="article:author" content="Alronics Tech">
```

---

## 🚀 Deployment Commands

```bash
# Initialize git (if new repo)
git init

# Stage all files
git add .

# Commit changes
git commit -m "Update homepage design"

# Push to GitHub
git push origin main

# Check status
git status

# View recent commits
git log --oneline -10
```

---

## 📱 Testing Checklist Code

```html
<!-- Add to page for quick testing -->
<div class="fixed bottom-4 right-4 bg-black text-white p-4 rounded text-xs">
  <p>Viewport: <span class="font-bold" id="viewport"></span></p>
  <p>Width: <span class="font-bold" id="width"></span>px</p>
</div>

<script>
  function updateInfo() {
    const width = window.innerWidth;
    let viewport = 'Mobile';
    if (width >= 768) viewport = 'Tablet (md)';
    if (width >= 1024) viewport = 'Desktop (lg)';
    
    document.getElementById('viewport').textContent = viewport;
    document.getElementById('width').textContent = width;
  }
  updateInfo();
  window.addEventListener('resize', updateInfo);
</script>
```

---

**Quick copy-paste ready code for your Alronics Tech website! 🚀**

*More snippets coming soon*
