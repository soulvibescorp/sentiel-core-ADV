document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // Simulated login – replace with real validation later
    if (email === 'user@sentinelcore.io' && password === 'SecurePass123') {
      localStorage.setItem('sentinel_auth', 'logged_in');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials.');
    }
  });

  // Redirect if already logged in
  if (localStorage.getItem('sentinel_auth') === 'logged_in' && window.location.pathname.includes('index.html')) {
    window.location.href = 'dashboard.html';
  }
});
