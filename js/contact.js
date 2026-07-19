/* ============================================================
   Contact form — client-side validation, no backend.
   On success, opens a pre-filled mailto: link (the only way a
   static site can actually deliver a message without a server).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const statusEl = form.querySelector('[data-form-status]');

  const rules = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    projectType: (v) => v !== '' || 'Please select a project type.',
    budget: (v) => v !== '' || 'Please select a budget range.',
    timeline: (v) => v !== '' || 'Please select a timeline.',
    message: (v) => v.trim().length >= 10 || 'Tell us a little more — at least 10 characters.'
  };

  function validateField(field){
    const rule = rules[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const wrapper = field.closest('.field');
    const errorEl = wrapper.querySelector('.field-error');
    if (result === true){
      wrapper.setAttribute('data-invalid', 'false');
      field.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
      return true;
    } else {
      wrapper.setAttribute('data-invalid', 'true');
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = result;
      return false;
    }
  }

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid){
      statusEl.textContent = 'Please fix the highlighted fields.';
      statusEl.setAttribute('data-state', 'error');
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent(`Project inquiry — ${data.projectType}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.projectType}\nBudget range: ${data.budget}\nTimeline: ${data.timeline}\n\nMessage:\n${data.message}`
    );

    statusEl.textContent = 'Thanks — opening your email client to send this through.';
    statusEl.setAttribute('data-state', 'success');
    window.location.href = `mailto:${SITE_DATA.profile.email}?subject=${subject}&body=${body}`;
    form.reset();
  });
});
