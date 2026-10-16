(function () {
  const config = window.PRAYAGRAJ_FORM_CONFIG || {};
  const notice = document.getElementById('form-notice');
  const frame = document.getElementById('interest-form-frame');
  const trackingNote = document.getElementById('form-tracking-note');

  if (!notice || !frame || !trackingNote) {
    console.error('Prayagraj interest form elements are missing from the page.');
    return;
  }

  const showNotice = (message, isError) => {
    notice.hidden = false;
    notice.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = isError ? 'The interest form could not be loaded.' : 'The interest form is not connected yet.';
    const detail = document.createElement('span');
    detail.textContent = message;
    notice.append(title, detail);
    if (isError) {
      const contact = document.createElement('a');
      contact.href = 'mailto:alronicstech@gmail.com?subject=Prayagraj%20STEM%20interest';
      contact.textContent = 'Contact Alronics Tech by email';
      notice.append(contact);
    }
    notice.classList.toggle('form-notice-error', Boolean(isError));
  };

  if (typeof config.embedUrl !== 'string' || !config.embedUrl.trim()) {
    return;
  }

  let formUrl;
  try {
    formUrl = new URL(config.embedUrl);
  } catch (error) {
    console.error('The configured Google Form URL is invalid.', error);
    showNotice('The form address is invalid. Please contact Alronics Tech while the form is being checked.', true);
    return;
  }

  if (
    formUrl.protocol !== 'https:' ||
    formUrl.hostname !== 'docs.google.com' ||
    !/^\/forms\/(?:d\/e\/[^/]+|d\/[^/]+)\/viewform\/?$/.test(formUrl.pathname)
  ) {
    console.error('The configured interest form must be a Google Forms viewform URL.');
    showNotice('The configured form address is not a valid Google Forms link. Please contact Alronics Tech while the form is being checked.', true);
    return;
  }

  const campaignValues = new URLSearchParams(window.location.search);
  const trackingKeys = ['source', 'medium', 'campaign', 'content'];
  const entryIds = config.utmEntryIds || {};
  let hasCampaignValue = false;
  let missingTrackingField = false;

  trackingKeys.forEach((key) => {
    const value = campaignValues.get(`utm_${key}`);
    if (!value) return;

    hasCampaignValue = true;
    const entryId = entryIds[key];
    if (typeof entryId === 'string' && /^\d+$/.test(entryId)) {
      formUrl.searchParams.set(`entry.${entryId}`, value.slice(0, 500));
    } else {
      missingTrackingField = true;
    }
  });

  formUrl.searchParams.set('embedded', 'true');
  frame.src = formUrl.toString();
  frame.hidden = false;
  notice.hidden = true;

  if (hasCampaignValue && missingTrackingField) {
    trackingNote.textContent = 'This visit includes campaign tags, but one or more matching Google Form tracking fields are not configured. The response can still be submitted, but the missing campaign values will not be recorded.';
    trackingNote.hidden = false;
  }

  frame.addEventListener('error', () => {
    frame.hidden = true;
    showNotice('The connected Google Form did not load. Please try again later or contact Alronics Tech.', true);
  });
})();
