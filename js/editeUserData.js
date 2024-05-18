const editForm = document.getElementById('editForm');

editForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Basic form validation
  if (!name) {
    document.getElementById('name').classList.add('is-invalid');
    return;
  } else {
    document.getElementById('name').classList.remove('is-invalid');
  }

  if (!email || !validateEmail(email)) {
    document.getElementById('email').classList.add('is-invalid');
    return;
  } else {
    document.getElementById('email').classList.remove('is-invalid');
  }

  // Submit the form if validation passes (you can implement additional logic here)
  editForm.submit();
});

// Simple email validation function (can be improved)
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/i;
  return re.test(email);
}
