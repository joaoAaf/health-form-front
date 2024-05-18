// Define calculateBMI function
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight)) {
        alert('Please enter valid height and weight values.');
        return;
    }

    const bmi = weight / (height * height);
    const bmiCategory = getBMICategory(bmi);
    const bmiResult = `Your BMI is ${bmi.toFixed(2)}. You are considered ${bmiCategory}.`;

    document.getElementById('bmiResult').textContent = bmiResult;
    displayDietGuide(bmiCategory);
}

// Define getBMICategory function
function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    else if (bmi < 25) return 'Normal weight';
    else if (bmi < 30) return 'Overweight';
    else return 'Obese';
}

// Define displayDietGuide function
function displayDietGuide(bmiCategory) {
    const dietGuideElement = document.getElementById('dietGuide');
    dietGuideElement.textContent = '';

    switch (bmiCategory) {
        case 'Underweight':
            dietGuideElement.innerHTML = `
                <p>Recommended diet: Increase your calorie intake from nutrient-rich foods like fruits, vegetables, whole grains, and lean proteins.</p>
                <ul>
                    <li>Focus on consuming 3-5 servings of fruits and vegetables daily.</li>
                    <li>Choose whole grains over refined grains.</li>
                    <li>Include lean protein sources like fish, poultry, beans, and lentils.</li>
                    <li>Limit unhealthy fats and processed foods.</li>
                </ul>
            `;
            break;

        case 'Normal weight':
            dietGuideElement.innerHTML = `
                <p>Recommended diet: Maintain a balanced diet with a focus on overall health and well-being.</p>
                <ul>
                    <li>Continue consuming a variety of nutrient-rich foods from all food groups.</li>
                    <li>Practice portion control to maintain a healthy weight.</li>
                    <li>Engage in regular physical activity.</li>
                </ul>
            `;
            break;

        case 'Overweight':
            dietGuideElement.innerHTML = `
                <p>Recommended diet: Implement a moderate calorie deficit to gradually reduce weight.</p>
                <ul>
                    <li>Make mindful food choices, prioritizing fruits, vegetables, and whole grains.</li>
                    <li>Reduce intake of processed foods, sugary drinks, and unhealthy fats.</li>
                    <li>Increase physical activity to burn more calories.</li>
                </ul>
            `;
            break;

        case 'Obese':
            dietGuideElement.innerHTML = `
                <p>Recommended diet: Seek personalized guidance from a registered dietitian or healthcare professional for a safe and effective weight management plan.</p>
                <ul>
                    <li>Consider a structured meal plan tailored to your individual needs and goals.</li>
                    <li>Consult a healthcare professional for any underlying health conditions that may influence your diet.</li>
                    <li>Combine dietary changes with regular physical activity under the guidance of a healthcare professional.</li>
                </ul>
            `;
            break;
    }
}

// Attach click event listener to button
document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    calculateBMI(); // Call calculateBMI function here
});
