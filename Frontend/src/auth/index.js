// index.js

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const loginData = { username, password };

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      // Login successful, redirect or display success message
      console.log('Login successful!');
      // Replace with your desired action after successful login
      // (e.g., window.location.href = '/dashboard';)
    } else {
      alert('Login failed: ' + data.error);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login.');
  }
}
