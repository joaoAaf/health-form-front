const imcUrl = "http://localhost:8765/imc"
const bmiForm = document.getElementById("bmiForm")

bmiForm.addEventListener("submit", function (event) {
  event.preventDefault();
  imcDiet();
});

async function imcDiet() {
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  const imcData = {
    "weight": weight,
    "height": height
  };

  try {
    const response = await fetch(imcUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
        },
      body: JSON.stringify(imcData),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(`Falha ao calcular IMC: ${responseJson.msg}`);
    }

    let result = document.getElementById('result');
    let imc = document.getElementById('imc');
    let msg = document.getElementById('msg');
    let diet = document.getElementById('diet');
    imc.innerHTML = `Seu IMC é de ${parseFloat(responseJson.data.imc).toFixed(2)}`;
    msg.innerHTML = responseJson.data.msg;
    diet.innerHTML = responseJson.data.diet;
    result.hidden = false;

  } catch (error) {
    console.error(error);
    alert(error);
  }
}