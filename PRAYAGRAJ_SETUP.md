# Prayagraj interest page setup

## Google Forms and Sheets connection

The supplied published form is configured as an embedded Google Form in `assets/js/prayagraj-config.js`. The page uses Google Forms to collect answers; it does not submit directly to a separate endpoint.

The supplied response spreadsheet URL could not be opened without authorization during setup, so this project cannot verify that it is linked to the supplied form. In the form owner's Google account:

1. Open the supplied form and check **Responses** → **Link to Sheets** (or the Sheets icon). Confirm it points to the intended response spreadsheet. If it is not linked, choose that spreadsheet or create/link the correct one.
2. Check that the existing form asks the questions and provides options below. Add or edit questions that are missing; keep contact consent required.
   - **I am a** — Multiple choice; required: Parent/Guardian, Student, School Representative.
   - **Parent/Guardian or adult contact name** — Short answer; required.
   - **Student age group** — Multiple choice; required: 6–8 years, 9–11 years, 12–14 years, 15–18 years.
   - **Parent/Guardian phone number** — Short answer; required. Add response validation for a phone number if appropriate for the intended audience.
   - **Email address** — Short answer; optional; use email validation.
   - **Preferred Prayagraj locality or PIN code** — Short answer; required.
   - **Areas of interest** — Checkboxes; required; Robotics and Arduino, Coding and Python, Artificial Intelligence, IoT and Smart Devices, Electronics and Circuit Design, 3D Design and Printing. Enable “Other” if useful.
   - **Preferred program format** — Multiple choice; required: Regular classes, Weekend/holiday workshops, Both, Not sure yet.
   - **Preferred schedule** — Checkboxes; required: Weekdays, Weekends, School holidays, Flexible/not sure yet.
   - **Expected monthly learning budget** — Multiple choice; required: Below ₹1,000, ₹1,000–₹2,000, ₹2,000–₹3,500, Above ₹3,500, Not sure yet.
   - **Would you be interested in attending a demo workshop?** — Multiple choice; required: Yes, Maybe, Not yet.
   - **Optional message** — Paragraph; optional.
   - **Contact consent** — Checkboxes; required, with exactly one option: “I agree that Alronics Tech may contact me regarding STEM learning opportunities and workshops in Prayagraj. I understand that this is an expression of interest, not confirmed enrollment.” Turn on required response and response validation to require exactly one selection if available.
3. In the form settings, enable a progress bar if the form uses multiple sections. Set or verify the confirmation message: **“Thank You for Your Interest! Your response helps us understand what families in Prayagraj want from future STEM learning programs. We’ll contact you if you have consented to follow-up. You can explore Alronics Tech at https://alronicstech.com/, watch on YouTube at https://www.youtube.com/@alronicstech, or follow on Instagram at https://www.instagram.com/alronicstech/.”** Google Forms owns this confirmation view; this page does not claim to inject custom buttons into it.
4. To capture campaign tags, add four optional short-answer questions at the end of the Google Form: `Campaign source`, `Campaign medium`, `Campaign name`, and `Campaign content`. Google Forms does not provide hidden questions; these prefilled fields will be visible to respondents and can be edited.
5. For each tracking question, use the form’s **Get pre-filled link** option, enter a temporary unique value, and generate the link. In the resulting URL, find the matching `entry.123456` parameter for each question. Put only its numeric ID in the corresponding `utmEntryIds` property in `assets/js/prayagraj-config.js`:

   ```js
   window.PRAYAGRAJ_FORM_CONFIG = {
     embedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeiq4zM5xIVYJG1pzklzw1g-zII56Bk7gKwJeDnE8O-TZ2Ziw/viewform?embedded=true",
     utmEntryIds: {
       source: "NUMERIC_SOURCE_ENTRY_ID",
       medium: "NUMERIC_MEDIUM_ENTRY_ID",
       campaign: "NUMERIC_CAMPAIGN_ENTRY_ID",
       content: "NUMERIC_CONTENT_ENTRY_ID"
     }
   };
   ```

   Keep the configured `embedUrl` as-is. Replace each example tracking ID with the corresponding numeric ID from your own form; never publish the example IDs. Until configured, the page warns visitors that incoming campaign values will not be recorded. After mapping, it appends incoming `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` values to their matching prefilled fields. Test each tag with a real response and verify the values in the response Sheet. Google Forms prefilled fields are visible, editable, and not tamper-proof.
6. Confirm the form is published and accepts responses from the intended audience without requesting access.
7. Submit a test response from a private/incognito browser, verify the response appears in the intended spreadsheet and the form's confirmation message is correct, then remove the test response before sharing the live URL. Do not treat the Sheet connection as verified until the response row is visible.

## Local preview

From the repository root, run:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/prayagraj/`. Test representative campaign parameters with:

```text
http://localhost:8000/prayagraj/?utm_source=qr-poster&utm_medium=offline&utm_campaign=prayagraj-validation&utm_content=poster-a
```

With the static server still running, open a second PowerShell window at the repository root and run the focused browser tests:

```powershell
npx.cmd playwright test tests\prayagraj.spec.js --workers=1
```

These browser tests cover the configured Google Form embed URL, invalid URL handling, campaign prefill, missing tracking-field warnings, and horizontal overflow from 320px to 1920px. They do not submit a real response. The configured iframe URL alone does not prove that the form is accepting responses or connected to the intended Sheet. Verify that a real test response appears in the response spreadsheet before announcing end-to-end data collection.

## GitHub Pages and production check

The repository's deployment documentation describes GitHub Pages and the root `CNAME` configures the custom domain. GitHub Pages does not use `vercel.json`; the `prayagraj/index.html` folder route is served as a static page at `/prayagraj/`. The Vercel rewrite file only applies if this project is deployed on Vercel.

Use the repository's existing GitHub Pages publishing source and workflow to publish the site; do not change DNS or custom-domain settings for this page. After the normal GitHub Pages deployment completes, check `https://alronicstech.com/prayagraj` (and the trailing-slash form if the host redirects) in a private browser window. Confirm the page loads, the canonical URL is correct, the logo and social destinations work, and the configured Google Form test response reaches the linked Sheet. Do not announce the form as live until that Sheet check succeeds.
