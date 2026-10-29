/**
 * SharePlate - Login & Role Switching Page Logic
 * Handles query parameter role preselection, 1-click demo logins, and custom credential submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check query param for preselected role (e.g., login.html?role=volunteer)
  const params = new URLSearchParams(window.location.search);
  const preRole = params.get('role');
  if (preRole && ['donor', 'receiver', 'volunteer', 'admin'].includes(preRole)) {
    const roleSelect = document.getElementById('login-role');
    if (roleSelect) roleSelect.value = preRole;
  }

  // Quick 1-click role buttons
  document.querySelectorAll('.quick-login-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      if (typeof SharePlateAuth !== 'undefined') {
        SharePlateAuth.loginAs(role);
      }
    });
  });

  // Custom login form submission
  const form = document.getElementById('custom-login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('login-role')?.value || 'donor';
      const email = document.getElementById('login-email')?.value || '';
      if (typeof SharePlateAuth !== 'undefined') {
        SharePlateAuth.loginAs(role, { email });
      }
    });
  }
});
