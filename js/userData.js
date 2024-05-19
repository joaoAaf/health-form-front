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
      throw new Error(`Falha ao atualizar usuário: ${responseJson.msg}`);
    }

    alert("Usuário atualizado com sucesso!");
    location.reload();

  } catch (error) {
    console.error(error);
    alert(error);
    location.reload();
  }
}

async function getUser() {

  try {
    const response = await fetch(userUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(`Falha ao obter usuário: ${responseJson.msg}`);
    }

    document.getElementById('name').value = responseJson.data.name;
    document.getElementById('email').value = responseJson.data.email;

  } catch (error) {
    console.error(error);
    alert(error);
    location.href = "/index.html";
  }
}

function confirmDelete() {
  if (confirm("Tem certeza que deseja deletar sua conta?")) {
    deleteUser();
  }
}

async function deleteUser() {

  try {
    const response = await fetch(userUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      },
    });

    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(`Falha ao deletar usuário: ${responseJson.msg}`);
    }

    alert("Usuário deletado com sucesso!");
    location.href = "/index.html";

  } catch (error) {
    console.error(error);
    alert(error);
    location.href = "/index.html";
  }
}

function showError(field, message) {
  const fieldElement = document.getElementById(field);
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('text-danger', 'mt-2');
  errorMessage.textContent = message;
  fieldElement.parentElement.insertBefore(errorMessage, fieldElement.nextSibling);
}
