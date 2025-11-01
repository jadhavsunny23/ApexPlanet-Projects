const apiKey = "b65e1cb4ee716da672f9e33879f984ab"; 

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }


  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const result = document.getElementById("result");
      result.innerHTML = `
        <h4>${data.name}</h4>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
    })
    .catch(error => {
      document.getElementById("result").innerHTML = `<p>${error.message}</p>`;
    });
});
