const userUrl = "http://localhost:8765/user"
const editForm = document.getElementById('editForm');

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  // Clear previous errors
  const errorMessages = document.querySelectorAll('.text-danger');
  errorMessages.forEach(message => message.remove());

  if (!name && !email && !password) {
    showError('name', 'Preencha pelo menos um dos campos');
    return;
  }

  if (password !== confirmPassword) {
    showError('confirm_password', 'As senhas não conferem!');
    return;
  }
  
  update(name, email, password)

});

async function update(name, email, password) {
  
  const updaterData = {
    "name": name,
    "email": email,
    "pass": password
  };

  try {
    const response = await fetch(userUrl, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
        },
      body: JSON.stringify(updaterData),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(`Falha ao realizar o cadastro: ${responseJson.msg}`);
    }

    console.log(responseJson.data);
    alert("Usuário atualizado com sucesso!");

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