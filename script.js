async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = ''; // Your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Get elements
  const tempElem = document.getElementById('temperature');
  const descElem = document.getElementById('description');
  const icon = document.getElementById('weatherIcon');

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  try {
    // Clear previous data & start animation
    tempElem.textContent = '';
    descElem.textContent = '';
    icon.style.display = 'none';
    icon.classList.remove('animate');

    // Optional: You can add a loading text or spinner here
    tempElem.textContent = 'Loading...';

    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // 👈 See API response in console

    if (data.cod !== 200) {
      alert(`Error: ${data.message}`);
      tempElem.textContent = '';
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Update UI
    tempElem.textContent = `${temp}°C`;
    descElem.textContent = desc;
    icon.src = iconUrl;
    icon.style.display = 'block';
    icon.classList.add('animate'); // Start rotation animation

  } catch (error) {
    console.error('Error fetching weather:', error);
    alert('Something went wrong while fetching data.');
    tempElem.textContent = '';
    descElem.textContent = '';
    icon.style.display = 'none';
    icon.classList.remove('animate');
  }
}
