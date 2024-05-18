const loginUrl = "http://localhost:8765/login"
const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const loginData = {
    "email": username,
    "pass": password
  };

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(`Falha ao fazer login: ${responseJson.msg}`);
    }

    sessionStorage.setItem("token", responseJson.data);
    window.location.href = "/html/imcDiet.html";

  } catch (error) {
    console.error(error);
    alert(error);
  }
}
