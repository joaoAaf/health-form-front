const registerUrl = "http://localhost:8765/user/register"
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  // Clear previous errors
  const errorMessages = document.querySelectorAll('.text-danger');
  errorMessages.forEach(message => message.remove());

  if (password !== confirmPassword) {
    showError('confirm_password', 'As senhas não conferem!');
    return;
  }
  
  register(name, email, password)

});

async function register(name, email, password) {
  
  const registerData = {
    "name": name,
    "email": email,
    "pass": password
  };

  try {
    const response = await fetch(registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(`Falha ao realizar o cadastro: ${responseJson.msg}`);
    }

    console.log(responseJson.data);
    alert("Cadastro realizado com sucesso!");

  } catch (error) {
    console.error(error);
    alert(error);
  }
}

function showError(field, message) {
  const fieldElement = document.getElementById(field);
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('text-danger', 'mt-2');
  errorMessage.textContent = message;
  fieldElement.parentElement.insertBefore(errorMessage, fieldElement.nextSibling);
}
