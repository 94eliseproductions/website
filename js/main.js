// Highlight the sidebar link for the section currently on screen
const links = document.querySelectorAll('.sidebar a');
const sections = [...links].map((a) => document.querySelector(a.getAttribute('href')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
    );
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach((s) => s && observer.observe(s));

// Newsletter form: submit without leaving the page
const form = document.querySelector('.newsletter');
const status = form.querySelector('.form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.action.includes('YOUR_FORM_ID')) {
    status.textContent = 'Newsletter sign-up isn’t connected yet.';
    return;
  }
  status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = 'Thanks — you’re on the list!';
  } catch {
    status.textContent = 'Something went wrong. Please try again.';
  }
});
