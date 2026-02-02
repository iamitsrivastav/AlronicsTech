# Blog Template - Quick Reference Guide

## 🚀 Fast Track: Creating Your First Blog Post (5 Minutes)

### Step 1: Copy the Template
```bash
Copy: blog/blog-template.html
To:   blog/[CATEGORY]/[slug].html
# Example: blog/robotics/line-following.html
```

### Step 2: Global Find & Replace

Open the file and use Find & Replace (Ctrl+H) to change:

```
[PROJECT_TITLE]          → "Line Following Robot"
[PROJECT_DESCRIPTION]    → "Build a robot that follows a black line"
[CATEGORY]               → "robotics"
[DATE]                   → "Feb 3, 2026"
[READ_TIME]              → "8"
[BEGINNER/INTERMEDIATE/ADVANCED] → "beginner"
```

### Step 3: Fill Content Sections

#### Hero Meta Tags (Required)
```html
<meta name="description" content="[YOUR 155 CHAR DESCRIPTION]">
<meta property="og:title" content="[YOUR TITLE]">
<meta property="og:image" content="/assets/images/[YOUR_IMAGE].png">
```

#### 1. Project Overview
Replace the paragraph with your project intro:
```html
<p class="text-lg text-gray-700 mb-4">
  Your 2-3 sentence overview here.
</p>
```

#### 2. Learning Outcomes
Update the 4 learning points (replace [CONCEPT_*]):
```html
<strong class="block mb-1">Concept Title</strong>
<span class="text-sm text-gray-600">Concept explanation</span>
```

#### 3. Components Table
Fill in the rows with your parts:
```html
<tr class="hover:bg-gray-50">
  <td class="border border-gray-300 px-4 py-2">Arduino Uno</td>
  <td class="border border-gray-300 px-4 py-2 text-center">1</td>
  <td class="border border-gray-300 px-4 py-2">Microcontroller</td>
  <td class="border border-gray-300 px-4 py-2">5V logic</td>
</tr>
```

#### 4. Circuit Diagram
Replace image path and add explanation:
```html
<img src="/assets/images/line-follower-circuit.png" 
     alt="Circuit for line following robot">
```

#### 5. Code Section
Paste your code between the <code> tags:
```html
<pre class="code-block"><code class="language-python">
# Your complete code here
</code></pre>
```

#### 6. Video ID
Replace with your YouTube ID:
```html
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" ...>
```

#### 7. Troubleshooting
Update error messages and solutions:
```html
<summary class="px-6 py-4 font-bold cursor-pointer hover:bg-gray-100">
  ❌ Error: "Light sensor not reading"
</summary>
<div class="px-6 pb-4 text-gray-700">
  <p class="mb-3"><strong>Cause:</strong> Sensor facing wrong direction</p>
  <p class="mb-3"><strong>Solution:</strong></p>
  <ol class="list-decimal list-inside space-y-2 ml-4">
    <li>Turn sensor to face the ground</li>
    <li>Adjust sensor height above line</li>
  </ol>
</div>
```

#### 8. Extensions
Update with 4 advanced ideas:
```html
<div class="bg-gradient-to-br from-green-50 to-emerald-50 ...">
  <h3 class="font-bold text-lg mb-2">
    🚀 Extension 1: Adjustable Speed
  </h3>
  <p class="text-gray-700 text-sm mb-3">
    Add PWM to control motor speed based on line detection strength.
  </p>
  <p class="text-gray-600 text-xs">
    <strong>Difficulty:</strong> Intermediate
  </p>
</div>
```

#### 9. Downloads
Link to your PDFs:
```html
<a href="/assets/pdfs/line-follower-code.zip" class="btn-primary ...">
  📦 Download Code (.zip)
</a>
```

### Step 4: Update Navigation Links
Change the previous/next post links:
```html
<a href="[PREVIOUS_POST].html" class="group">
  <span class="text-sm text-gray-600">← Previous Project</span>
  <h3 class="text-lg font-bold">Obstacle Avoidance Robot</h3>
</a>
<a href="[NEXT_POST].html" class="group text-right md:text-right">
  <span class="text-sm text-gray-600">Next Project →</span>
  <h3 class="text-lg font-bold">Speed Control Robot</h3>
</a>
```

### Step 5: Update Related Projects
```html
<a href="/blog/robotics/obstacle.html" class="card-hover">
  <h3 class="text-xl font-bold mb-2">Obstacle Avoidance Robot</h3>
  <p class="text-gray-600 text-sm">Learn obstacle detection...</p>
</a>
```

---

## 📋 Complete Placeholder Reference

### Page Meta
| Placeholder | Example | Where |
|---|---|---|
| `[PROJECT_TITLE]` | "Line Following Robot" | Title tag, hero, breadcrumb |
| `[PROJECT_DESCRIPTION]` | "Follow a black line..." | Meta description, OG tags |
| `[CATEGORY]` | "robotics" | Breadcrumb, badge |
| `[DATE]` | "Feb 3, 2026" | Article meta |
| `[READ_TIME]` | "8" | Article meta |
| `[BEGINNER/INTERMEDIATE/ADVANCED]` | "intermediate" | Multiple locations |

### Content Sections
| Placeholder | What to Put | Example |
|---|---|---|
| `[PROJECT_OVERVIEW_PARAGRAPH]` | 2-3 sentences explaining the project | "This robot uses..." |
| `[FEATURE_1]`, `[FEATURE_2]`, `[FEATURE_3]` | Key abilities of the project | "Follows black lines" |
| `[CONCEPT_1]` | Learning outcome title | "Line Sensors" |
| `[CONCEPT_1_DESCRIPTION]` | What they'll learn | "How photodiodes detect light" |
| `[COMPONENT_1]` | Part name | "Arduino Uno" |
| `[QTY]` | Quantity needed | "1" |
| `[SPECS]` | Component specifications | "8-bit microcontroller, 5V" |
| `[NOTES]` | Additional info | "Can use alternatives" |

### Code & Circuits
| Placeholder | What to Put |
|---|---|
| `[LANGUAGE]` | "python", "cpp", "javascript" |
| `[COMPLETE_CODE_HERE]` | Your full source code with comments |
| `[SETUP_CODE]` | Library imports and initialization |
| `[LOGIC_CODE]` | Main algorithm/loop code |
| `[FUNCTIONS_CODE]` | Helper function definitions |
| `[PROJECT_CIRCUIT].png` | Filename of circuit diagram image |
| `[CONNECTION_1]`, `[CONNECTION_2]` | Wire connections to verify |

### External Resources
| Placeholder | What to Put |
|---|---|
| `[YOUTUBE_VIDEO_ID]` | From youtube.com/watch?v=`dQw4w9WgXcQ` |
| `[PROJECT_CODE].zip` | Filename for code download |
| `[PROJECT_DOCS].pdf` | Filename for documentation |
| `[PROJECT_COMPONENTS].pdf` | Filename for parts list |
| `[PROJECT_CIRCUIT].png` | Filename for diagram |

### Errors & Troubleshooting
| Placeholder | What to Put |
|---|---|
| `[ERROR_1]` | Error message the user might see |
| `[ERROR_1_CAUSE]` | Why this error happens |
| `[SOLUTION_STEP_1]` | First troubleshooting step |

### Extensions
| Placeholder | What to Put |
|---|---|
| `[EXTENSION_1_TITLE]` | Name of the advanced modification |
| `[EXTENSION_1_DESCRIPTION]` | How to implement it |

### Navigation
| Placeholder | What to Put | Example |
|---|---|---|
| `[PREVIOUS_POST].html` | Previous project file | "obstacle.html" |
| `[NEXT_POST].html` | Next project file | "speed-control.html" |
| `[PREVIOUS_PROJECT_TITLE]` | Title of previous | "Obstacle Avoidance" |
| `[NEXT_PROJECT_TITLE]` | Title of next | "Motor Speed Control" |
| `[RELATED_PROJECT_1].html` | Related project | "pwm-control.html" |

---

## 🎨 Template Structure Overview

```
Blog Post
├── Meta Tags
│   ├── Title, description, keywords
│   ├── Open Graph (OG) tags
│   └── Schema markup ready
├── Header
│   ├── Breadcrumb navigation
│   ├── Category badge
│   ├── Title & description
│   └── Article metadata
├── Table of Contents
│   └── 9 linked sections
├── Main Content
│   ├── 1. Project Overview
│   ├── 2. Learning Outcomes
│   ├── 3. Components List
│   ├── 4. Circuit Diagram
│   ├── 5. Code Explanation
│   ├── 6. Video Tutorial
│   ├── 7. Troubleshooting
│   ├── 8. Extension Ideas
│   └── 9. Downloads
├── Related Content
│   ├── Related projects
│   ├── Previous/Next posts
│   └── CTA section
└── Footer
    └── Site footer
```

---

## ✅ Checklist Before Publishing

- [ ] All `[PLACEHOLDER]` text replaced
- [ ] Images added to `/assets/images/`
- [ ] Code tested and working
- [ ] YouTube video ID is correct
- [ ] PDF files uploaded to `/assets/pdfs/`
- [ ] Links to related posts are correct
- [ ] Meta description is 155-160 characters
- [ ] All section content is filled in
- [ ] Grammar checked
- [ ] Images have alt text
- [ ] Links tested (internal and external)
- [ ] Mobile view looks good

---

## 💡 Pro Tips

### Code Blocks
The template automatically displays code with syntax highlighting. Add language class:
```html
<code class="language-python">
<code class="language-cpp">
<code class="language-javascript">
```

### Copy Button
Works automatically! Users can click "Copy Code" button to copy to clipboard.

### Images
Always include in `/assets/images/`:
- Circuit diagram (1200x800px PNG)
- Project photo (1200x600px JPG)
- Component photo (optional)

### Videos
Just replace the YouTube video ID:
```
Old: youtube.com/embed/dQw4w9WgXcQ
New: youtube.com/embed/YOUR_VIDEO_ID
```

### PDF Downloads
Place files in `/assets/pdfs/` and link them:
```html
<a href="/assets/pdfs/my-project-code.zip">
  📦 Download Code
</a>
```

### Colors
To change colors, use Tailwind classes:
- Primary buttons: `bg-blue-600 hover:bg-blue-700`
- Success boxes: `bg-green-50 border-green-300`
- Warning boxes: `bg-yellow-50 border-yellow-300`

### Difficulty Levels
- `beginner` – Can do with basic guidance
- `intermediate` – Needs some prior experience
- `advanced` – For experienced makers

---

## 🔗 Linking to Posts

From homepage or other pages:
```html
<a href="/blog/robotics/line-following.html">
  Line Following Robot
</a>
```

From category page:
```html
<a href="/blog/robotics/line-following.html">...</a>
```

In blog post (related):
```html
<a href="/blog/robotics/obstacle.html">...</a>
```

---

## 📊 SEO Tips for Blog Posts

### Meta Description (Critical!)
```html
<!-- 155-160 characters, includes your main keyword -->
<meta name="description" content="Build a line following robot that detects black lines using light sensors. Complete code, circuit diagram, and troubleshooting guide included.">
```

### Keywords
Include naturally in:
- Title
- First paragraph
- Headings (H2, H3)
- Image alt text
- First 100 words

### Headings
```
H1: [PROJECT_TITLE] – Only one per page!
H2: Main sections (Overview, Components, Code)
H3: Subsections (Learning Outcomes, Installation)
```

---

## 🎓 Teaching Tips

### For Beginners
- Add more detailed explanations
- Include step-by-step photos
- Provide simpler version of code
- Add more troubleshooting

### For Intermediate
- Explain the "why" behind code
- Include optimization ideas
- Provide challenges/questions
- Link to related concepts

### For Advanced
- Skip basic explanations
- Focus on optimization
- Add algorithm complexity notes
- Suggest research papers

---

## 📱 Mobile Preview

Test your post on mobile:
1. Open blog post on phone or tablet
2. Text should be readable (no pinch-zoom)
3. Images should scale properly
4. Code blocks should be scrollable
5. Buttons should be easy to tap (>44px)

---

## 🚀 Publishing Workflow

1. **Create draft** – Copy template, fill placeholders
2. **Add content** – Write explanations, add code
3. **Add media** – Upload images, PDFs, diagrams
4. **Test links** – Click all internal/external links
5. **Mobile check** – View on phone/tablet
6. **Grammar check** – Use Grammarly or similar
7. **SEO check** – Verify meta tags, headings
8. **Commit to Git** – `git add .` `git commit -m "Add new post"`
9. **Push to GitHub** – `git push origin main`
10. **Verify live** – Check website updated
11. **Share** – Post on YouTube, social media

---

**Happy blogging! 📚🚀**

*For questions, see README.md or IMPLEMENTATION_GUIDE.md*
