          const registerForm = document.getElementById('registerForm');

          registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm_password').value.trim();
            const terms = document.getElementById('terms').checked;

            // Clear previous errors
            const errorMessages = document.querySelectorAll('.text-danger');
            errorMessages.forEach(message => message.remove());

            // Validate form inputs
            let isValid = true; // Flag to track overall form validity

            if (!name) {
              registerForm.classList.add('was-validated'); // Trigger Bootstrap validation styles
              showError('name', 'Please enter your full name.');
              isValid = false;
            }

            if (!email || !validateEmail(email)) {
              registerForm.classList.add('was-validated');
              showError('email', 'Please enter a valid email address.');
              isValid = false;
            }

            if (!password) {
              registerForm.classList.add('was-validated');
              showError('password', 'Please enter a password.');
              isValid = false;
            }

            if (!confirmPassword || password !== confirmPassword) {
              registerForm.classList.add('was-validated');
              showError('confirm_password', 'Passwords do not match.');
              isValid = false;
            }

            if (!terms) {
              registerForm.classList.add('was-validated');
              showError('terms', 'You must agree to the terms and conditions.');
              isValid = false;
            }

            if (!isValid) {
              return; // Prevent form submission if validation fails
            }

            // Submit the form or handle registration logic here
            // (e.g., send an API request to your backend)
            console.log('Registration data:', { name, email, password });
            // Replace with your actual registration logic (API call, etc.)
          });

          function showError(field, message) {
            const fieldElement = document.getElementById(field);
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('text-danger', 'mt-2');
            errorMessage.textContent = message;
            fieldElement.parentElement.insertBefore(errorMessage, fieldElement.nextSibling);
          }

          function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/i;
            return re.test(email);
          }
